import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSubjectComponent } from './documents-subject.component';

describe('DocumentsSubjectComponent', () => {
  let component: DocumentsSubjectComponent;
  let fixture: ComponentFixture<DocumentsSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
