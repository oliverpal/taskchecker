import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { TranslationService } from '../../services/translation.service';
import { ModalService } from '../../services/modal.service';
import { Task } from '../../models/task.model';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ModalComponent } from '../modal/modal.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;
  let mockModalService: jasmine.SpyObj<ModalService>;
  let tasksSignal: WritableSignal<Task[]>;
  let allCompletedSignal: WritableSignal<boolean>;

  const mockTasks: Task[] = [
    { id: '1', text: 'Test task 1', completed: false, createdAt: new Date() },
    { id: '2', text: 'Test task 2', completed: true, createdAt: new Date() },
    { id: '3', text: 'Test task 3', completed: false, createdAt: new Date() }
  ];

  beforeEach(async () => {
    // Create writable signals for testing
    tasksSignal = signal(mockTasks);
    allCompletedSignal = signal(false);

    // Create spy objects for services
    mockTaskService = jasmine.createSpyObj('TaskService', [
      'addTask',
      'toggleTask',
      'deleteTask',
      'editTask',
      'clearAllTasks'
    ], {
      tasks: tasksSignal,
      areAllTasksCompleted: allCompletedSignal
    });

    mockTranslationService = jasmine.createSpyObj('TranslationService', ['translate']);
    mockTranslationService.translate.and.returnValue('Translated text');

    mockModalService = jasmine.createSpyObj('ModalService', ['openModal']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: ModalService, useValue: mockModalService }
      ]
    })
    .overrideComponent(TaskListComponent, {
      set: {
        imports: [FormsModule],
        template: `
          <!-- Top Progress Bar -->
          @if (totalCount() > 0) {
          <div
            class="top-progress-bar"
            role="progressbar"
            [attr.aria-valuenow]="progressPercentage()"
            aria-valuemin="0"
            aria-valuemax="100"
            [attr.aria-label]="'Task completion progress: ' + progressPercentage() + '%'"
          >
            <div class="top-progress-fill" [style.width.%]="progressPercentage()"></div>
          </div>
          }

          <main class="task-container" role="main">
            <!-- Add Task Form -->
            <section class="add-task-section" aria-labelledby="add-task-heading">
              <div class="input-group">
                <div class="input-container">
                  <input
                    id="new-task-input"
                    type="text"
                    [(ngModel)]="newTaskText"
                    [placeholder]="translate('addTask.placeholder')"
                    class="task-input"
                    maxlength="200"
                    [attr.aria-describedby]="
                      newTaskText.length > 180 ? 'char-limit-warning' : null
                    "
                  />
                  @if (newTaskText.length > 180) {
                  <div id="char-limit-warning" class="char-warning" role="alert">
                    {{ 200 - newTaskText.length }} characters remaining
                  </div>
                  }
                </div>
                <button
                  (click)="addTask()"
                  [disabled]="!newTaskText.trim()"
                  class="add-btn"
                  type="button"
                >
                  {{ translate("addTask.button") }}
                </button>
              </div>
            </section>

            <!-- Task List -->
            <section class="task-list-section">
              <div
                class="task-list"
                role="list"
                [attr.aria-label]="
                  'Task list with ' +
                  totalCount() +
                  ' tasks, ' +
                  completedCount() +
                  ' completed'
                "
              >
                @for (task of tasks(); track task.id) {
                <article
                  class="task-item"
                  [class.completed]="task.completed"
                  role="listitem"
                >
                  <div class="task-content">
                    <label class="checkbox-container" [attr.for]="'task-' + task.id">
                      <input
                        [id]="'task-' + task.id"
                        type="checkbox"
                        [checked]="task.completed"
                        (change)="toggleTask(task.id)"
                        class="task-checkbox"
                        [attr.aria-label]="
                          'Mark task as ' +
                          (task.completed ? 'incomplete' : 'complete') +
                          ': ' +
                          task.text
                        "
                      />
                    </label>

                    @if (editingTaskId === task.id) {
                    <input
                      type="text"
                      [(ngModel)]="editingText"
                      (keydown)="onEditKeyPress($event)"
                      (blur)="saveTaskEdit()"
                      class="task-edit-input"
                      #editInput
                      maxlength="200"
                    />
                    } @else {
                    <span
                      class="task-text"
                      [class.crossed-out]="task.completed"
                      (click)="!task.completed && startEditingTask(task)"
                      [class.editable]="!task.completed"
                    >
                      {{ task.text }}
                    </span>
                    }
                  </div>

                  <button
                    (click)="deleteTask(task.id)"
                    class="delete-btn"
                    [title]="translate('actions.deleteTask')"
                  >
                    <span class="delete-icon">×</span>
                  </button>
                </article>
                } @empty {
                <div class="empty-state">
                  <div class="empty-icon">📝</div>
                  <h3>{{ translate("emptyState.title") }}</h3>
                  <p>{{ translate("emptyState.message") }}</p>
                </div>
                }
              </div>
            </section>

            <!-- Clear All Button -->
            @if (tasks().length > 0) {
            <div class="actions-section">
              <button (click)="clearAllTasks()" class="clear-all-btn">
                {{ translate("actions.clearAll") }}
              </button>
            </div>
            }

            <!-- Footer -->
            <footer class="app-footer" role="contentinfo">
              <nav class="footer-nav" aria-label="Footer navigation">
                <div class="footer-links">
                  <button
                    type="button"
                    class="footer-link"
                    (click)="openModal('imprint')"
                  >
                    {{ translate("footer.imprint") }}
                  </button>
                </div>
              </nav>
            </footer>
          </main>
        `
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty newTaskText', () => {
      expect(component.newTaskText).toBe('');
    });

    it('should initialize with no editing task', () => {
      expect(component.editingTaskId).toBeNull();
      expect(component.editingText).toBe('');
    });
  });

  describe('Computed Properties', () => {
    it('should calculate progress percentage correctly', () => {
      // With 1 completed out of 3 tasks = 33%
      expect((component as any).progressPercentage()).toBe(33);
    });

    it('should calculate completed count correctly', () => {
      expect((component as any).completedCount()).toBe(1);
    });

    it('should calculate total count correctly', () => {
      expect((component as any).totalCount()).toBe(3);
    });

    it('should return 0 progress when no tasks exist', () => {
      tasksSignal.set([]);
      fixture.detectChanges();
      expect((component as any).progressPercentage()).toBe(0);
    });

    it('should return 100 progress when all tasks completed', () => {
      const allCompletedTasks = mockTasks.map(task => ({ ...task, completed: true }));
      tasksSignal.set(allCompletedTasks);
      fixture.detectChanges();
      expect((component as any).progressPercentage()).toBe(100);
    });
  });

  describe('Task Operations', () => {
    describe('addTask', () => {
      it('should add task when text is provided', () => {
        component.newTaskText = 'New test task';
        (component as any).addTask();

        expect(mockTaskService.addTask).toHaveBeenCalledWith('New test task');
        expect(component.newTaskText).toBe('');
      });

      it('should not add task when text is empty', () => {
        component.newTaskText = '';
        (component as any).addTask();

        expect(mockTaskService.addTask).not.toHaveBeenCalled();
      });

      it('should not add task when text is only whitespace', () => {
        component.newTaskText = '   ';
        (component as any).addTask();

        expect(mockTaskService.addTask).not.toHaveBeenCalled();
      });
    });

    describe('toggleTask', () => {
      it('should toggle task completion', () => {
        (component as any).toggleTask('1');
        expect(mockTaskService.toggleTask).toHaveBeenCalledWith('1');
      });
    });

    describe('deleteTask', () => {
      it('should delete task', () => {
        (component as any).deleteTask('1');
        expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1');
      });
    });

    describe('clearAllTasks', () => {
      it('should clear all tasks when confirmed', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        (component as any).clearAllTasks();
        expect(mockTaskService.clearAllTasks).toHaveBeenCalled();
      });

      it('should not clear tasks when not confirmed', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        (component as any).clearAllTasks();
        expect(mockTaskService.clearAllTasks).not.toHaveBeenCalled();
      });
    });
  });

  describe('Task Editing', () => {
    describe('startEditingTask', () => {
      it('should start editing mode for a task', () => {
        const task = mockTasks[0];
        (component as any).startEditingTask(task);

        expect(component.editingTaskId).toBe(task.id);
        expect(component.editingText).toBe(task.text);
      });
    });

    describe('saveTaskEdit', () => {
      it('should save task edit when valid text provided', () => {
        component.editingTaskId = '1';
        component.editingText = 'Updated task text';
        (component as any).saveTaskEdit();

        expect(mockTaskService.editTask).toHaveBeenCalledWith('1', 'Updated task text');
        expect(component.editingTaskId).toBeNull();
        expect(component.editingText).toBe('');
      });

      it('should not save when no editing task ID', () => {
        component.editingTaskId = null;
        component.editingText = 'Updated task text';
        (component as any).saveTaskEdit();

        expect(mockTaskService.editTask).not.toHaveBeenCalled();
      });

      it('should not save when text is empty', () => {
        component.editingTaskId = '1';
        component.editingText = '';
        (component as any).saveTaskEdit();

        expect(mockTaskService.editTask).not.toHaveBeenCalled();
      });
    });

    describe('cancelEdit', () => {
      it('should cancel editing mode', () => {
        component.editingTaskId = '1';
        component.editingText = 'Some text';
        (component as any).cancelEdit();

        expect(component.editingTaskId).toBeNull();
        expect(component.editingText).toBe('');
      });
    });
  });

  describe('Keyboard Events', () => {
    describe('onKeyPress', () => {
      it('should add task on Enter key', () => {
        component.newTaskText = 'New task';
        const event = new KeyboardEvent('keypress', { key: 'Enter' });
        spyOn(component as any, 'addTask');

        (component as any).onKeyPress(event);

        expect((component as any).addTask).toHaveBeenCalled();
      });

      it('should not add task on other keys', () => {
        component.newTaskText = 'New task';
        const event = new KeyboardEvent('keypress', { key: 'Space' });
        spyOn(component as any, 'addTask');

        (component as any).onKeyPress(event);

        expect((component as any).addTask).not.toHaveBeenCalled();
      });
    });

    describe('onEditKeyPress', () => {
      it('should save edit on Enter key', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        spyOn(component as any, 'saveTaskEdit');

        (component as any).onEditKeyPress(event);

        expect((component as any).saveTaskEdit).toHaveBeenCalled();
      });

      it('should cancel edit on Escape key', () => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        spyOn(component as any, 'cancelEdit');

        (component as any).onEditKeyPress(event);

        expect((component as any).cancelEdit).toHaveBeenCalled();
      });
    });
  });

  describe('Modal Operations', () => {
    it('should open modal with correct type', () => {
      (component as any).openModal('imprint');
      expect(mockModalService.openModal).toHaveBeenCalledWith('imprint');
    });
  });

  describe('Translation Service', () => {
    it('should translate keys correctly', () => {
      const result = (component as any).translate('test.key');
      expect(mockTranslationService.translate).toHaveBeenCalledWith('test.key');
      expect(result).toBe('Translated text');
    });
  });

  describe('Template Rendering', () => {
    it('should render task list when tasks exist', () => {
      const taskElements = fixture.debugElement.queryAll(By.css('.task-item'));
      expect(taskElements.length).toBe(3);
    });

    it('should render empty state when no tasks', () => {
      tasksSignal.set([]);
      fixture.detectChanges();

      const emptyState = fixture.debugElement.query(By.css('.empty-state'));
      expect(emptyState).toBeTruthy();
    });

    it('should render progress bar when tasks exist', () => {
      const progressBar = fixture.debugElement.query(By.css('.top-progress-bar'));
      expect(progressBar).toBeTruthy();
    });

    it('should not render progress bar when no tasks', () => {
      tasksSignal.set([]);
      fixture.detectChanges();

      const progressBar = fixture.debugElement.query(By.css('.top-progress-bar'));
      expect(progressBar).toBeFalsy();
    });

    it('should render clear all button when tasks exist', () => {
      const clearButton = fixture.debugElement.query(By.css('.clear-all-btn'));
      expect(clearButton).toBeTruthy();
    });

    it('should not render clear all button when no tasks', () => {
      tasksSignal.set([]);
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('.clear-all-btn'));
      expect(clearButton).toBeFalsy();
    });

    it('should disable add button when input is empty', () => {
      component.newTaskText = '';
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.add-btn'));
      expect(addButton.nativeElement.disabled).toBeTruthy();
    });

    it('should enable add button when input has text', () => {
      component.newTaskText = 'New task';
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.add-btn'));
      expect(addButton.nativeElement.disabled).toBeFalsy();
    });

    it('should show character warning when approaching limit', () => {
      component.newTaskText = 'a'.repeat(185); // 185 chars, over 180 limit
      fixture.detectChanges();

      const warning = fixture.debugElement.query(By.css('.char-warning'));
      expect(warning).toBeTruthy();
    });

    it('should not show character warning when under limit', () => {
      component.newTaskText = 'Short text';
      fixture.detectChanges();

      const warning = fixture.debugElement.query(By.css('.char-warning'));
      expect(warning).toBeFalsy();
    });
  });

  describe('User Interactions', () => {
    it('should call addTask when add button is clicked', () => {
      spyOn(component as any, 'addTask');
      component.newTaskText = 'New task';
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('.add-btn'));
      addButton.nativeElement.click();

      expect((component as any).addTask).toHaveBeenCalled();
    });

    it('should call toggleTask when checkbox is clicked', () => {
      spyOn(component as any, 'toggleTask');

      const checkbox = fixture.debugElement.query(By.css('.task-checkbox'));
      checkbox.nativeElement.click();

      expect((component as any).toggleTask).toHaveBeenCalledWith('1');
    });

    it('should call deleteTask when delete button is clicked', () => {
      spyOn(component as any, 'deleteTask');

      const deleteButton = fixture.debugElement.query(By.css('.delete-btn'));
      deleteButton.nativeElement.click();

      expect((component as any).deleteTask).toHaveBeenCalledWith('1');
    });

    it('should start editing when task text is clicked and task is not completed', () => {
      spyOn(component as any, 'startEditingTask');

      const taskText = fixture.debugElement.query(By.css('.task-text:not(.crossed-out)'));
      taskText.nativeElement.click();

      expect((component as any).startEditingTask).toHaveBeenCalledWith(mockTasks[0]);
    });

    it('should call clearAllTasks when clear all button is clicked', () => {
      spyOn(component as any, 'clearAllTasks');

      const clearButton = fixture.debugElement.query(By.css('.clear-all-btn'));
      clearButton.nativeElement.click();

      expect((component as any).clearAllTasks).toHaveBeenCalled();
    });

    it('should call openModal when footer links are clicked', () => {
      spyOn(component as any, 'openModal');

      const footerLinks = fixture.debugElement.queryAll(By.css('.footer-link'));
      footerLinks[0].nativeElement.click(); // Click imprint link

      expect((component as any).openModal).toHaveBeenCalledWith('imprint');
    });
  });

  describe('Task Edit Mode', () => {
    beforeEach(() => {
      component.editingTaskId = '1';
      component.editingText = 'Editing text';
      fixture.detectChanges();
    });

    it('should show edit input when in edit mode', () => {
      const editInput = fixture.debugElement.query(By.css('.task-edit-input'));
      expect(editInput).toBeTruthy();
    });

    it('should not show task text when in edit mode', () => {
      // In our simplified template, task text is hidden by @if condition
      // when editingTaskId matches the task id
      const taskTexts = fixture.debugElement.queryAll(By.css('.task-text'));
      // Should have 2 task texts visible (tasks 2 and 3, since task 1 is being edited)
      expect(taskTexts.length).toBe(2);
    });

    it('should call saveTaskEdit on blur', () => {
      spyOn(component as any, 'saveTaskEdit');

      const editInput = fixture.debugElement.query(By.css('.task-edit-input'));
      editInput.nativeElement.dispatchEvent(new Event('blur'));

      expect((component as any).saveTaskEdit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on task checkboxes', () => {
      const checkbox = fixture.debugElement.query(By.css('.task-checkbox'));
      const ariaLabel = checkbox.nativeElement.getAttribute('aria-label');
      
      expect(ariaLabel).toContain('Mark task as complete');
      expect(ariaLabel).toContain('Test task 1');
    });

    it('should have proper ARIA labels on task list', () => {
      const taskList = fixture.debugElement.query(By.css('.task-list'));
      const ariaLabel = taskList.nativeElement.getAttribute('aria-label');
      
      expect(ariaLabel).toContain('Task list with 3 tasks, 1 completed');
    });

    it('should have proper ARIA labels on progress bar', () => {
      const progressBar = fixture.debugElement.query(By.css('.top-progress-bar'));
      const ariaLabel = progressBar.nativeElement.getAttribute('aria-label');
      
      expect(ariaLabel).toContain('Task completion progress: 33%');
    });

    it('should have character warning with role alert', () => {
      component.newTaskText = 'a'.repeat(185);
      fixture.detectChanges();

      const warning = fixture.debugElement.query(By.css('.char-warning'));
      expect(warning.nativeElement.getAttribute('role')).toBe('alert');
    });
  });

  describe('Focus Management', () => {
    it('should focus edit input after view checked when editing', () => {
      const mockEditInput = {
        nativeElement: jasmine.createSpyObj('HTMLInputElement', ['focus', 'select'])
      };
      
      component.editingTaskId = '1';
      (component as any).editInput = mockEditInput;
      
      component.ngAfterViewChecked();
      
      expect(mockEditInput.nativeElement.focus).toHaveBeenCalled();
      expect(mockEditInput.nativeElement.select).toHaveBeenCalled();
    });

    it('should not focus when not editing', () => {
      const mockEditInput = {
        nativeElement: jasmine.createSpyObj('HTMLInputElement', ['focus', 'select'])
      };
      
      component.editingTaskId = null;
      (component as any).editInput = mockEditInput;
      
      component.ngAfterViewChecked();
      
      expect(mockEditInput.nativeElement.focus).not.toHaveBeenCalled();
      expect(mockEditInput.nativeElement.select).not.toHaveBeenCalled();
    });
  });
});