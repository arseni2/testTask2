function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StockEntity } from "./StockEntity.js";
export class ProductEntity {
}
_ts_decorate([
    PrimaryGeneratedColumn()
], ProductEntity.prototype, "id", void 0);
_ts_decorate([
    Column({
        unique: true,
        type: "int"
    })
], ProductEntity.prototype, "plu", void 0);
_ts_decorate([
    Column({
        type: "varchar"
    })
], ProductEntity.prototype, "name", void 0);
_ts_decorate([
    OneToMany(()=>StockEntity, (stock)=>stock.product, {
        nullable: true
    })
], ProductEntity.prototype, "stocks", void 0);
ProductEntity = _ts_decorate([
    Entity("product")
], ProductEntity);
