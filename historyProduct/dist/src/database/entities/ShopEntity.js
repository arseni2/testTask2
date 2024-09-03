function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StockEntity } from './StockEntity.js';
export class ShopEntity {
}
_ts_decorate([
    PrimaryGeneratedColumn()
], ShopEntity.prototype, "id", void 0);
_ts_decorate([
    Column({
        unique: true,
        type: "varchar"
    })
], ShopEntity.prototype, "name", void 0);
_ts_decorate([
    OneToMany(()=>StockEntity, (stock)=>stock.shop, {
        nullable: true
    })
], ShopEntity.prototype, "stocks", void 0);
ShopEntity = _ts_decorate([
    Entity("shop")
], ShopEntity);
