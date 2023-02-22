import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBulletPointsDirective } from './add-bullet-points.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AddBulletPointsDirective],
  exports: [AddBulletPointsDirective],
})
export class BulletPointModule {}
