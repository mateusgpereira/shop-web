import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { BannerItem } from './types'

@Component({
  selector: 'app-banner-news',
  templateUrl: './banner-news.component.html',
  styleUrls: ['./banner-news.component.scss']
})
export class BannerNewsComponent implements AfterViewInit {
  bannerItems: BannerItem[]

  @ViewChild('carouselIndicators', { read: ElementRef })
  carouselIndicators!: ElementRef<HTMLDivElement>

  @ViewChild('carouselContent', { read: ElementRef })
  carouselContent!: ElementRef<HTMLDivElement>

  constructor() {
    this.bannerItems = [
      { image: 'assets/imgs/xiaomi12lite_banner.png', description: 'Xiaomi 12 Banner' },
      { image: 'assets/imgs/books_banner.png', description: 'Mi books banner' }
    ]
  }

  ngAfterViewInit(): void {
    const firstIndicator = this.carouselIndicators.nativeElement.querySelector('button')
    firstIndicator?.classList.add('active')
    firstIndicator?.setAttribute('aria-current', 'true')
    this.carouselContent.nativeElement.querySelector('.carousel-item')?.classList.add('active')
  }
}
