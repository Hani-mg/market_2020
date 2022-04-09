export class UtilPagination {
    private static  itemNumberPerPage = 9;

    static getOffset(currentPage) {
       return  (currentPage - 1) * this.itemNumberPerPage;
    }

    static getLimit(){
        return this.itemNumberPerPage;
    }
}