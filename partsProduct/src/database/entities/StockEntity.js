import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { ProductEntity } from './ProductEntity.js';
import {ShopEntity} from "./ShopEntity.js";

export @Entity("stock") class StockEntity {
    @PrimaryGeneratedColumn()
    id;

    @Column({type: "int"})
    quantityOnShelf;

    @Column({type: "int"})
    quantityInOrder;

    @Column({type: "int"})
    shopId;

    @Column({type: "int"})
    productId;

    @ManyToOne(() => ProductEntity, product => product.stocks, {nullable: true})
    product;

    @ManyToOne(() => ShopEntity, shop => shop.stocks, {nullable: true})
    shop;
}