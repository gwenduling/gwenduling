import { Component, Input, OnInit } from '@angular/core';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrls: ['./confetti.component.scss'],
})
export class ConfettiComponent implements OnInit {
  @Input() emoji: string[] | undefined;

  emojies: CanvasEmoji[] | null = [];
  canvasContext: CanvasRenderingContext2D | null = null;
  canvasWidth: number | null = null;
  canvasHeight: number | null = null;
  continueDraw: boolean = true;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    const canvas = document.getElementById('confetti') as HTMLCanvasElement;
    this.canvasContext = canvas.getContext('2d');
    this.canvasContext!.scale(2, 2);
    this.generateCanvasSize(canvas);
    this.generateEmojis();
  }

  generateCanvasSize(canvas: HTMLCanvasElement): void {
    const { width, height } = canvas.getBoundingClientRect();
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  generateEmojis(): void {
    for (let iterate = 0; iterate < 100; iterate++) {
      const x = Math.floor(Math.random() * this.canvasWidth!);
      const offsetY = Math.abs(Math.floor(Math.random() * 300));
      const fontSize = Math.floor(Math.random() * 70);

      this.emojies!.push({
        emoji: this.emoji![Math.floor(Math.random() * this.emoji!.length)],
        x,
        y: this.canvasHeight! + offsetY,
        count: Math.floor(Math.random() * 3) + 4,
        fontSize,
      });

      if (iterate === 99) {
        this.drawConfetti();
        this.endDraw();
      }
    }
  }

  endDraw(): void {
    setTimeout(() => {
      this.continueDraw = false;

      if (!this.eventsService.event!.description) {
        this.eventsService.closeEvent();
      }

      setTimeout(() => {
        this.canvasContext!.clearRect(
          0,
          0,
          this.canvasWidth!,
          this.canvasHeight!
        );
      });
    }, 5000);
  }

  drawConfetti(): void {
    this.canvasContext!.clearRect(0, 0, this.canvasWidth!, this.canvasHeight!);

    this.emojies!.forEach((emoji) => {
      this.drawEmoji(emoji);
      emoji.y = emoji.y - emoji.count;
    });

    if (this.continueDraw) {
      requestAnimationFrame(this.drawConfetti.bind(this));
    }
  }

  drawEmoji(emoji: CanvasEmoji): void {
    this.canvasContext!.beginPath();
    this.canvasContext!.font = emoji.fontSize + 'px serif';
    this.canvasContext!.fillText(emoji.emoji, emoji.x, emoji.y);
  }
}

export interface CanvasEmoji {
  x: number;
  y: number;
  count: number;
  fontSize: number;
  emoji: string;
}
