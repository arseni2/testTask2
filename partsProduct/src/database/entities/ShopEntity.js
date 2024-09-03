import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StockEntity } from './StockEntity.js';

export @Entity("shop") class ShopEntity {
    @PrimaryGeneratedColumn()
    id;

    @Column({ unique: true, type: "varchar" })
    name;

    @OneToMany(() => StockEntity, stock => stock.shop, {nullable: true})
    stocks;
}