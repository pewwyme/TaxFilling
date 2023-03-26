import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxFilingComponent } from './tax-filing.component';

describe('TaxFilingComponent', () => {
  let component: TaxFilingComponent;
  let fixture: ComponentFixture<TaxFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxFilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
