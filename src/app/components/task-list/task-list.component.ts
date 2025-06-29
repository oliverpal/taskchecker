import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  computed,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TranslationService } from '../../services/translation.service';
import { ModalService, ModalType } from '../../services/modal.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, LanguageSwitcherComponent, ModalComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements AfterViewChecked {
  private readonly taskService = inject(TaskService);
  private readonly translationService = inject(TranslationService);
  private readonly modalService = inject(ModalService);

  // Public properties for template binding
  tasks = this.taskService.tasks;
  newTaskText = '';
  editingTaskId: string | null = null;
  editingText = '';

  // Computed properties using signals
  protected readonly progressPercentage = computed(() => {
    const tasks = this.tasks();
    const totalCount = tasks.length;
    const completedCount = tasks.filter((task) => task.completed).length;
    return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  });

  protected readonly completedCount = computed(
    () => this.tasks().filter((task) => task.completed).length
  );
  protected readonly totalCount = computed(() => this.tasks().length);
  protected readonly showCompletionMessage =
    this.taskService.areAllTasksCompleted;

  @ViewChild('editInput') private editInput?: ElementRef<HTMLInputElement>;

  ngAfterViewChecked(): void {
    if (this.editInput && this.editingTaskId) {
      this.editInput.nativeElement.focus();
      this.editInput.nativeElement.select();
    }
  }

  protected addTask(): void {
    if (this.newTaskText.trim()) {
      this.taskService.addTask(this.newTaskText);
      this.newTaskText = '';
    }
  }

  protected toggleTask(id: string): void {
    this.taskService.toggleTask(id);
  }

  protected deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  protected clearAllTasks(): void {
    if (confirm(this.translate('actions.clearAllConfirm'))) {
      this.taskService.clearAllTasks();
    }
  }

  protected translate(key: string): string {
    return this.translationService.translate(key);
  }

  protected startEditingTask(task: Task): void {
    this.editingTaskId = task.id;
    this.editingText = task.text;
  }

  protected saveTaskEdit(): void {
    if (this.editingTaskId && this.editingText.trim()) {
      this.taskService.editTask(this.editingTaskId, this.editingText);
    }
    this.cancelEdit();
  }

  protected cancelEdit(): void {
    this.editingTaskId = null;
    this.editingText = '';
  }

  protected onEditKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveTaskEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }

  protected onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  /**
   * Opens a modal of the specified type
   */
  protected openModal(type: ModalType): void {
    this.modalService.openModal(type);
  }
}
