function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './ProductEntity.js';
import { ShopEntity } from "./ShopEntity.js";
export class StockEntity {
}
_ts_decorate([
    PrimaryGeneratedColumn()
], StockEntity.prototype, "id", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], StockEntity.prototype, "quantityOnShelf", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], StockEntity.prototype, "quantityInOrder", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], StockEntity.prototype, "shopId", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], StockEntity.prototype, "productId", void 0);
_ts_decorate([
    ManyToOne(()=>ProductEntity, (product)=>product.stocks, {
        nullable: true
    })
], StockEntity.prototype, "product", void 0);
_ts_decorate([
    ManyToOne(()=>ShopEntity, (shop)=>shop.stocks, {
        nullable: true
    })
], StockEntity.prototype, "shop", void 0);
StockEntity = _ts_decorate([
    Entity("stock")
], StockEntity);
