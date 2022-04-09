export class Category{
    constructor();
    constructor(idCategory: number, categoryName: string )
    constructor(idCategory?: number, categoryName?: string ) {
        this.idCategory = idCategory;
        this.categoryName =  categoryName;
    }
    idCategory: number;
    categoryName: string;
}