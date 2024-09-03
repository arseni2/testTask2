import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StockEntity} from "./StockEntity.js";

export @Entity("product") class ProductEntity {
    @PrimaryGeneratedColumn()
    id;

    @Column({ unique: true, type: "int" })
    plu;

    @Column({type: "varchar"})
    name;

    @OneToMany(() => StockEntity, stock => stock.product, {nullable: true})
    stocks;
}
