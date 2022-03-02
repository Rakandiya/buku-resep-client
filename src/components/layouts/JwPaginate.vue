<template>
    <ul v-if="pager.pages && pager.pages.length" class="pagination" :style="ulStyles">
        <li class="page-item first" :class="{'disabled': pager.currentPage === 1}" :style="liStyles">
            <a class="page-link" @click="setPage(1)" :style="aStyles">{{labels.first}}</a>
        </li>
        <li class="page-item previous" :class="{'disabled': pager.currentPage === 1}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage - 1)" :style="aStyles">{{labels.previous}}</a>
        </li>
        <li v-for="page in pager.pages" :key="page" class="page-item page-number" :class="{'active': pager.currentPage === page}" :style="liStyles">
            <a class="page-link" @click="setPage(page)" :style="aStyles">{{page}}</a>
        </li>
        <li class="page-item next" :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage + 1)" :style="aStyles">{{labels.next}}</a>
        </li>
        <li class="page-item last" :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.totalPages)" :style="aStyles">{{labels.last}}</a>
        </li>
    </ul>
</template>

<script>
    // import paginate from 'jw-paginate';
    const defaultLabels = {
        first: '<<',
        last: '>>',
        previous: '<',
        next: '>'
    };
    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
            initialPage: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 8
            },
            maxPages: {
                type: Number,
                default: 8
            },
            labels: {
                type: Object,
                default: () => defaultLabels
            },
            styles: {
                type: Object
            },
            disableDefaultStyles: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                pager: {},
                ulStyles: {},
                liStyles: {},
                aStyles: {}
            }
        },
        created () {
            // if (!this.$emit('changePage')) {
            //     throw 'Missing required event listener: "changePage"';
            // }
            // set default styles unless disabled
            if (!this.disableDefaultStyles) {
                this.ulStyles = defaultStyles.ul;
                this.liStyles = defaultStyles.li;
                this.aStyles = defaultStyles.a;
            }
            // merge custom styles with default styles
            if (this.styles) {
                this.ulStyles = { ...this.ulStyles, ...this.styles.ul };
                this.liStyles = { ...this.liStyles, ...this.styles.li };
                this.aStyles = { ...this.aStyles, ...this.styles.a };
            }
            // set to initial page
            this.setPage(this.initialPage);
        },
        methods: {
            setPage(page) {
                const { items, pageSize, maxPages } = this;
                // get new pager object for specified page
                const pager = this.paginate(items.length, page, pageSize, maxPages);
                // get new page of items from items array
                const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
                // update pager
                this.pager = pager;
                // emit change page event to parent component
                this.$emit('changePage', pageOfItems);
            },
            paginate(totalItems, currentPage, pageSize, maxPages) {
                if (currentPage === void 0) { currentPage = 1; }
                if (pageSize === void 0) { pageSize = 10; }
                if (maxPages === void 0) { maxPages = 10; }
                // calculate total pages
                var totalPages = Math.ceil(totalItems / pageSize);
                // ensure current page isn't out of range
                if (currentPage < 1) {
                    currentPage = 1;
                }
                else if (currentPage > totalPages) {
                    currentPage = totalPages;
                }
                var startPage, endPage;
                if (totalPages <= maxPages) {
                    // total pages less than max so show all pages
                    startPage = 1;
                    endPage = totalPages;
                }
                else {
                    // total pages more than max so calculate start and end pages
                    var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
                    var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
                    if (currentPage <= maxPagesBeforeCurrentPage) {
                        // current page near the start
                        startPage = 1;
                        endPage = maxPages;
                    }
                    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                        // current page near the end
                        startPage = totalPages - maxPages + 1;
                        endPage = totalPages;
                    }
                    else {
                        // current page somewhere in the middle
                        startPage = currentPage - maxPagesBeforeCurrentPage;
                        endPage = currentPage + maxPagesAfterCurrentPage;
                    }
                }
                // calculate start and end item indexes
                var startIndex = (currentPage - 1) * pageSize;
                var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
                // create an array of pages to ng-repeat in the pager control
                var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(function (i) { return startPage + i; });
                // return object with all pager properties required by the view
                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            }
        },
        watch: {
            items () {
                this.setPage(this.initialPage);
            }
        }
    }
</script>


<style scoped>
ul{
    list-style: none;
    margin: 0;
    margin-bottom: 50px;
    padding: 0;
    display: flex;
    justify-content: center;
}

li {
    list-style: none;
    display: 'inline';
    text-align: 'center';
    cursor: pointer;
    color: #10bfbf;
    margin: 5px;
}

a {
    cursor: 'pointer';
    padding: '6px 12px';
    display: 'block';
    float: 'left';
    font-size: 20px;
}

li.active {
    color: white;
    background-color: #10bfbf;
    border: 1px solid #10bfbf;
    border-radius: 50%;
}

a.page-link {
    padding: 0 6.40px;
}

li.disabled {
    /* cursor: not-allowed; */
    opacity: 0.5;
}
</style>