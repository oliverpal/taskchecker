import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'tc_tasks';
  private readonly tasksSignal = signal<Task[]>([]);
  public readonly tasks = computed(() => this.tasksSignal());

  constructor(private readonly localStorageService: LocalStorageService) {
    this.loadTasks();
  }

  private loadTasks(): void {
    const savedTasks = this.localStorageService.getItem<Task[]>(this.STORAGE_KEY) || [];
    this.tasksSignal.set(savedTasks);
  }

  private saveTasks(tasks: Task[]): void {
    this.localStorageService.setItem(this.STORAGE_KEY, tasks);
    this.tasksSignal.set(tasks);
  }

  addTask(text: string): void {
    const currentTasks = this.tasksSignal();
    const newTask: Task = {
      id: this.generateId(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    this.saveTasks([...currentTasks, newTask]);
  }

  toggleTask(id: string): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined
        };
      }
      return task;
    });
    this.saveTasks(updatedTasks);
  }

  editTask(id: string, newText: string): void {
    const currentTasks = this.tasksSignal();
    const trimmedText = newText.trim();
    
    if (!trimmedText) return; // Don't save empty tasks
    
    const updatedTasks = currentTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          text: trimmedText
        };
      }
      return task;
    });
    this.saveTasks(updatedTasks);
  }

  deleteTask(id: string): void {
    const currentTasks = this.tasksSignal();
    const updatedTasks = currentTasks.filter(task => task.id !== id);
    this.saveTasks(updatedTasks);
  }

  clearAllTasks(): void {
    this.saveTasks([]);
    this.localStorageService.clear();
  }

  getAllCompletedTasks = computed(() => 
    this.tasksSignal().filter(task => task.completed)
  );

  areAllTasksCompleted = computed(() => {
    const tasks = this.tasksSignal();
    return tasks.length > 0 && tasks.every(task => task.completed);
  });

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}