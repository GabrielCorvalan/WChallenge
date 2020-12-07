import { OrderByPipe } from './../../pipes/order-by.pipe';
import { TechListsComponent } from './tech-lists.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TechListsService } from './tech-lists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { element } from 'protractor';

const techs = [{
  tech: 'Node',
  year: '2009',
  author: 'Ryan Dahl',
  license: 'MIT',
  language: 'JavaScript',
  type: 'Back-End',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png'
},
{
  tech: 'React',
  year: '2013',
  author: 'Jordan Walke',
  license: 'MIT',
  language: 'JavaScript',
  type: 'Front-End',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png'
},
{
  tech: 'Vue',
  year: '2014',
  author: 'Evan You',
  license: 'MIT',
  language: 'JavaScript',
  type: 'Front-End',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/220px-Vue.js_Logo_2.svg.png'
}
];

describe('Componente de listado de tecnologias', () => {
  let component: TechListsComponent;
  let fixture: ComponentFixture<TechListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        declarations: [TechListsComponent, OrderByPipe],
        imports: [HttpClientTestingModule, ReactiveFormsModule],
        providers: [TechListsService]
      }
    );
    fixture = TestBed.createComponent(TechListsComponent);
    component = fixture.componentInstance;
    component.techs = techs;
    component.filteredTechs = techs;
    fixture.detectChanges();
  });

  it('Deberia crearse', () => {
    expect(component).toBeDefined();
  });

  it('Se deberian actualizar los filtros', () => {
    component.showHideFilters();

    fixture.detectChanges();

    const filterIcons = fixture.debugElement.queryAll(By.css('.filter-icon'));

    filterIcons.forEach(element => {
      const filtersLength = component.enabledFilters.length;
      const nativeFilterIcon = element.nativeElement;

      nativeFilterIcon.click();
      fixture.detectChanges();

      expect(component.enabledFilters.length).not.toEqual(filtersLength);

    });

  });

  it('La busqueda debe filtrar las tecnologias segun corresponda', () => {
      const searchInput = fixture.debugElement.query(By.css('.search-input'));
      (searchInput.nativeElement as HTMLInputElement).value = 'R';
      (searchInput.nativeElement as HTMLInputElement).dispatchEvent(new Event('input'))
      fixture.detectChanges();

      expect(component.filteredTechs.length).toEqual(1);

  });

  it('La busqueda debe contener la misma cantidad de items total al borrarse lo escrito en el input (incluso activando filtros)', () => {
    const searchInput = fixture.debugElement.query(By.css('.search-input'));
    (searchInput.nativeElement as HTMLInputElement).value = 'R';
    (searchInput.nativeElement as HTMLInputElement).dispatchEvent(new Event('input'))
    fixture.detectChanges();

    const filterIcons = fixture.debugElement.queryAll(By.css('.filter-icon'));

    filterIcons[3].nativeElement.click();
    filterIcons[4].nativeElement.click();
    (searchInput.nativeElement as HTMLInputElement).value = '';
    (searchInput.nativeElement as HTMLInputElement).dispatchEvent(new Event('input'));


    expect(component.filteredTechs).toEqual(techs);

  });

  it('Las propiedades agregadas deben estar dentro del objeto de tecnologias', () => {
    const orderIcon = fixture.debugElement.queryAll(By.css('.order-icon'));
    const keys = Object.keys(component.techs[1]);
    orderIcon.forEach((debugElement) => {
      debugElement.nativeElement.click();

      expect(keys.includes(component.order.orderProperty)).toEqual(true);
    })

  });

});
