import { NotFoundException } from '../exceptions';

export class Utils {

  static isEmpty<T>(list: T[]): boolean {
    return !Utils.hasResults(list);
  }

  static hasResults<T>(list: T[]): boolean {
    return (typeof list === 'object' && !!list && list.length) 
      ? list.length > 0 
      : false;
  }

  static assertResult<T>(result: T, idOrKey: number | string): void {
    if (result === null) {
      throw new NotFoundException(`${idOrKey}`);
    }
  }

  static assertResults<T>(list: T[], idOrKey: number | string | number[]): void {
    if (!Utils.hasResults(list)) {
      throw new NotFoundException(`${idOrKey}`);
    }
  }

  static single<T>(list: T[]): T {
    return Utils.hasResults(list) ? list[0] : null;
  }

  static isPositive(num: number): boolean {
    return num >= 0;
  }

  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static getColor(): string {
    const colors = [
      '#f44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#9E9E9E',
      '#607D8B',
      '#ff1744',
      '#C51162',
      '#D500F9',
      '#651FFF',
      '#3D5AFE',
      '#2979FF',
      '#00B0FF',
      '#00E5FF',
      '#1DE9B6',
      '#00E676',
      '#76FF03',
      '#AEEA00',
      '#FFD600',
      '#FFC400',
      '#FF9100',
      '#DD2C00',
    ];
    return colors[this.getRandomNumber(0, colors.length)];
  }
}