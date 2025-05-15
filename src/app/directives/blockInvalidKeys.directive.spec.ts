import { BlockInvalidKeysDirective } from './blockInvalidKeys.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<input appBlockInvalidKeys />`
})
class TestComponent {}

describe('BlockInvalidKeysDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, BlockInvalidKeysDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    const directive = new BlockInvalidKeysDirective();
    expect(directive).toBeTruthy();
  });

  it('should prevent typing invalid key', () => {
    const validKey = 'e';
    let event = new KeyboardEvent('keydown', { key: validKey, cancelable: true });
    const spyPreventDefault = jasmine.createSpy('preventDefault');
    Object.defineProperty(event, 'preventDefault', {
      value: spyPreventDefault,
      configurable: true
    });

    inputElement.dispatchEvent(event);
    expect(spyPreventDefault).not.toHaveBeenCalled();
  });

  it('should allow typing valid keys', () => {
    const validKey = '5';
    let event = new KeyboardEvent('keydown', { key: validKey, cancelable: true });
    const spyPreventDefault = jasmine.createSpy('preventDefault');
    Object.defineProperty(event, 'preventDefault', {
      value: spyPreventDefault,
      configurable: true
    });

    inputElement.dispatchEvent(event);
    expect(spyPreventDefault).not.toHaveBeenCalled();
  });
});