// ------------------------------------------------------------------------------------ //
// Requires 'response.js' to work. No additional libraries required.
// ------------------------------------------------------------------------------------ //

const barrel = {
    main: document.querySelector('.barrel'),
    holder:  document.querySelector('.barrel').querySelector('.holder'),
    container: {
        items: [],
        selectors: [],
        contents: [],
        template: null
    },
    columnCount: 0,
    selectedCategory: -1,
    isTransitioning: false,
    responsive: -1,
    isResizing: false,
    resize: function (fullWidth = true) {
        if (this.isResizing) return;
        this.isResizing = true;
        const container = barrel.holder;
        const items = barrel.container.items;
        // use areas
        if (fullWidth) {
            // if already set, don't do again
            if (barrel.responsive == 'pc') return;
            barrel.responsive = 'pc';
            //// contents
            barrel.container.contents.forEach(e => {
                document.querySelector('.container').appendChild(e);
            });
            //// items
            // areas
            let g = 0;
            let vareas = '';
            function addArea(split = 0) {
                if (vareas.length > 1) vareas += ' ';
                var v = "'";
                if (split == 0) {
                    for (let i = 1; i <= barrel.columnCount; i++) {
                        g++;
                        v += `g${g}` + (i < barrel.columnCount ? ' ' : '');
                    }
                } else { // split the area for remaining pieces
                    var ar = [];
                    for (let i = 0; i < barrel.columnCount; i++)
                    ar.push(i % split);
                    ar.sort();
                    var p = -1;
                    for (let i = 0; i < barrel.columnCount; i++) {
                        if (ar[i] != p) {
                            p = ar[i];
                            g++;
                        }
                        v += `g${g}` + (i < barrel.columnCount - 1 ? ' ' : '');
                    }
                }
                v += "'";
                vareas += v;
            }
            // rows
            let vrow = '';
            const rh = vareas.split('" "').length + 1;
            for (let i = 0; i < rh; i++) {
                vrow += 'auto' + (i < rh - 1 ? ' ' : '');
            }
            // columns
            let vcolumn = '';
            for (let i = 0; i < barrel.columnCount; i++) {
                if (i < items.length) vcolumn += 'auto' + (i < barrel.columnCount - 1 ? ' ' : '');
            }
            // items
            let y = 1, z = 0;
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                e.style.gridArea = `g${i + 1}`
                const x = z != 0 ? (z < barrel.columnCount - 1 ? 2 : 3) : 1;
                e.setAttribute('open', false);
                e.setAttribute('x', x);
                e.setAttribute('y', y.toString());
                z++;
                if (z >= barrel.columnCount) {
                    y++;
                    z = 0;
                    addArea();
                }
                // if the item is in a row that does not have
                // the 'barrel.columnCount' amount of items available
                else if (i == items.length - 1) {
                    addArea(z);
                }
            }
            // container
            barrel.container.template = {
                areas: vareas,
                columns: vcolumn,
                rows: vrow
            };
            container.style.gridTemplateAreas = vareas;
            container.style.gridTemplateColumns = vcolumn;
            container.style.gridTemplateRows = vrow;
        }
        else {
            // if already set, don't do again
            if (barrel.responsive == 0) return;
            barrel.responsive = 0;
            //// contents
            // place all 'contents' to their 'selector items'
            for (let i = 0; i < barrel.container.contents.length; i++) {
                const e = barrel.container.contents[i];
                barrel.container.items[i].appendChild(e);
            }
            // items
            for (let i = 0; i < items.length; i++) {
                const e = items[i];
                e.setAttribute('open', false);
                e.setAttribute('x', '1');
                e.setAttribute('y', (i + 1).toString());
            }
            // container
            // container.style.gridTemplateAreas = 'none';
            // container.style.gridTemplateColumns = 'none';
            // container.style.gridTemplateRows = 'none';
        }
        this.isResizing = false;
    },
    setCategory: function (index) {
        const holder = barrel.holder;
        const item = barrel.container.items[index];
        const selector = barrel.container.selectors[index];
        const content = barrel.container.contents[index];
        // if mobile view, all can be opened at the same time
        const open = barrel.selectedCategory != index;
        if (open) {
            barrel.selectedCategory = index;
            selector.style.zIndex = barrel.container.items.length;
            // edit template so that it streches one of the items to cover
            if (barrel.responsive == 'pc') {
                const cols = barrel.container.template['columns'].split(' ');
                const rows = barrel.container.template['rows'].split(' ');
                var vcols = '';
                var vrows = '';
                // columns
                for (let i = 0; i < cols.length; i++) {
                    if (i > 0) vcols += (i < cols.length ? ' ' : '');
                    vcols += (i == index ? '100%' : '0');
                }
                // rows
                for (let i = 0; i < rows.length; i++) {
                    if (i > 0) vrows += (i < rows.length ? ' ' : '');
                    vrows += i == index % barrel.main.columnCount ? '100%' : '0';
                }
                holder.style.gridTemplateColumns = vcols
                holder.style.gridTemplateRows = vrows
            }
        } else {
            // return template back to what it was originally
            if (barrel.responsive == 'pc') {
                holder.style.gridTemplateColumns = barrel.container.template['columns']
                holder.style.gridTemplateRows = barrel.container.template['rows']
            }            
            barrel.selectedCategory = -1;
            setTimeout(() => {
                selector.style.zIndex = index;
            }, 1000);
        }
        item.setAttribute('open', open ? 'true' : 'false');
        item.style.marginBottom = open ? `${content.offsetHeight}px` : '0px';
        barrel.resizeValue = index;
        setTimeout(() => {
            barrel.isTransitioning = false;
        }, 1050);
    },
    start: function () {
        barrel.columnCount = Number.parseInt(barrel.main.getAttribute('row'));
        // set items
        for (let i = 0; i < barrel.holder.children.length; i++) {
            const item = barrel.holder.children[i];
            const selector = item.querySelector('.selector');
            const content = item.querySelector('.content');
            content.setAttribute('id', item.id);
            barrel.container.items.push(item);
            barrel.container.selectors.push(selector);
            barrel.container.contents.push(content);
            // set click functionality to categories
            barrel.container.selectors[i].addEventListener('click', function () {
                if (barrel.isTransitioning) return;
                if (barrel.responsive == 'pc')
                    if (i != barrel.selectedCategory && barrel.selectedCategory != -1)
                        return;
                barrel.isTransitioning = true;
                barrel.setCategory(i);
            });
        }
        // on resize
        this.listener = ikaResponsive.registerListener(function(val) {
            barrel.resize(!val);
        });
        barrel.resize(ikaResponsive.isMobileSize);
    }
};
barrel.start();