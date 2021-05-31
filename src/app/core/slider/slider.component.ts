import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { UserStoreService } from '@anosrv-core/user-store.service';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.scss';
import { Router } from '@angular/router';

@Component({
  selector: 'anosrv-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  private static SLIDER_INTERVAL = 7000;

  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  currentSlide = 0;
  slider: KeenSlider = null;
  interval: any = 0;
  pause = false;
  innerWidth = 0;

  constructor(
    public userStoreService: UserStoreService,
    public router: Router,
    private window: Window) {
  }

  setPause(active) {
    this.pause = active;
    this.registerInterval();
  }

  next() {
    this.slider.next();
    this.registerInterval();
  }

  prev() {
    this.slider.prev();
    this.registerInterval();
  }

  route() {
    this.router.navigateByUrl('/urlaub');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.createSlider();
  }

  ngAfterViewInit() {
    this.innerWidth = this.window.innerWidth;
    this.createSlider();
  }

  ngOnDestroy() {
    if (this.slider) {
      this.resetInterval();
    }
  }

  slidesPerView(): number  {
    if (this.isDesktop()) {
      return 3;
    } else {
      return 1;
    }
  }

  private createSlider() {
    if (this.slider) {
      this.slider.destroy();
    }

    const slidesPerView = this.slidesPerView();
    const slideChangedCallback = this.isDesktop() ? this.slideChangedDesktop : this.slideChangedMobile;

    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        slidesPerView,
        initial: this.currentSlide,
        loop: true,
        mode: 'snap',
        slideChanged: slideChangedCallback.bind(this),
        dragStart: () => {
          this.setPause(true);
        },
        dragEnd: () => {
          this.setPause(false);
        },
      });
    });
    this.setPause(false);
  }

  private slideChangedDesktop(s) {
    const numberOfImages = s.details().size;
    const relativeSlide = s.details().relativeSlide;
    this.currentSlide = relativeSlide + 1;
    if (this.currentSlide === numberOfImages) {
      this.currentSlide = 0;
    }
  }

  private slideChangedMobile(s) {
    this.currentSlide = s.details().relativeSlide;
  }

  private isDesktop(): boolean {
    return window.innerWidth >= 1200;
  }

  private resetInterval() {
    clearInterval(this.interval);
  }

  private registerInterval() {
    this.resetInterval();
    this.interval = setInterval(() => {
      if (!this.pause) {
        this.slider.next();
      }
    }, SliderComponent.SLIDER_INTERVAL);
  }
}
