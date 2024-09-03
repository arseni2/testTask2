function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
export class ActionEntity {
}
_ts_decorate([
    PrimaryGeneratedColumn()
], ActionEntity.prototype, "id", void 0);
_ts_decorate([
    Column({
        type: "varchar"
    })
], ActionEntity.prototype, "action", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], ActionEntity.prototype, "shopId", void 0);
_ts_decorate([
    Column({
        type: "int"
    })
], ActionEntity.prototype, "productId", void 0);
_ts_decorate([
    CreateDateColumn({
        type: "timestamp"
    })
], ActionEntity.prototype, "createdAt", void 0);
_ts_decorate([
    UpdateDateColumn({
        type: "timestamp"
    })
], ActionEntity.prototype, "updatedAt", void 0);
ActionEntity = _ts_decorate([
    Entity("action")
], ActionEntity);
