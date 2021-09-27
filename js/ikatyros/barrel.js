const barrel = {
    main: null,
    holder: null,
    fullWidthContainer: null,
    columnCount: 1,
    rowCount: 1,
    isResizing: false,
    isTransitioning: false,
    container: {
        items: [],
        selectors: [],
        contents: [],
        template: null
    },
    selectedCategory: -1,
    getRes: function () {
        return barrel.main.getAttribute('ika-responsive');
    },
    resize: function (fullWidth) {
        // set barrel size
        const elWidth = !fullWidth ? `${100 / barrel.columnCount}%` : '100%';
        const elHeight = !fullWidth ? `${100 / barrel.rowCount + 2}%` : '100%';
        document.documentElement.style.setProperty('--barrel-width', elWidth);
        document.documentElement.style.setProperty('--barrel-height', elHeight);

        for (let i = 0; i < barrel.container.items.length; i++) {
            // Set position: absolute values (left+top / right+bottom)
            const e = barrel.container.items[i];
            const p = getPlaceInGrid(barrel.columnCount, barrel.rowCount, i);
            // the item can be on either left or right side
            if (barrel.columnCount > 2) {
                if (p.horizontal.val != '0') {
                    e.style.transform = p.transform;
                }
                switch (p.horizontal.side) {
                    case 'left':
                        e.style.left = p.horizontal.val;
                        break;
                    case 'right':
                        e.style.right = p.horizontal.val;
                        break;
                }
            }
            // the item can be on either top or bottom side
            if (barrel.rowCount > 1) {
                switch (p.vertical.side) {
                    case 'top':
                        e.style.top = p.vertical.val;
                        break;
                    case 'bottom':
                        e.style.bottom = p.vertical.val;
                        break;
                }
            }
            // Set [x] and [y] values to the items
            e.setAttribute('x', p.x);
            e.setAttribute('y', p.y);
            e.style.zIndex = i + 10
        }
    },
    setCategory: function (index) {
        const e = barrel.container.items[index];
        const v = barrel.selectedCategory == -1;
        setTimeout(() => {
            e.setAttribute('open', e.getAttribute('open') == 'true' ? 'false' : 'true');
        }, 220);
        if (v) {
            barrel.selectedCategory = index;
            e.style.zIndex = barrel.container.items.length + 10;
        } else {
            barrel.selectedCategory = -1;
            setTimeout(() => {
                e.style.zIndex = index + 10;
            }, 720);
        }
        if (barrel.getRes() == 'pc') {
            var oh1 = 0;
            if (v) {
                $(barrel.fullWidthContainer).css({ display: 'block' });
                for (let i = 0; i < barrel.fullWidthContainer.children.length; i++) {
                    barrel.fullWidthContainer.children[i].style.display = i == index ? 'block' : 'none';
                }
                oh1 = barrel.holder.offsetHeight;
                // document.documentElement.style.setProperty('--fullwidth-height', `${oh1}px`);
            } else {
                setTimeout(() => {
                    barrel.fullWidthContainer.style.display = 'none';
                }, 1200);
                // document.documentElement.style.setProperty('--fullwidth-height', '0');
            }
            // responsiveBarrel.fullWidthContainer.style.marginTop = `${oh1}px`;
        } else {
            // if (v) {
            //     setTimeout(() => {
            //         const oh2 = responsiveBarrel.container.contents[index].offsetHeight;
            //         document.documentElement.style.setProperty('--fullwidth-height', `${oh2}px`);
            //     }, 300);
            // } else {
            //     document.documentElement.style.setProperty('--fullwidth-height', '0');
            // }
        }
        setTimeout(() => {
            barrel.isTransitioning = false;
        }, 720);
    },
    start: function (main) {
        this.main = $(main).get(0);
        this.holder = $(main).find('.item-container').get(0);
        barrel.fullWidthContainer = $(main).find('.fullwidth-container').get(0);
        function createBodyCopy(body) {
            const e = document.createElement('div');
            e.className = 'body';
            e.id = body.id;
            e.innerHTML = body.innerHTML;
            barrel.fullWidthContainer.appendChild(e);
        }
        $(barrel.fullWidthContainer).css({
            display: 'none'
        });
        // items
        for (let i = 0; i < this.holder.children.length; i++) {
            const item = this.holder.children[i];
            const head = item.querySelector('.head');
            const body = item.querySelector('.body');
            body.setAttribute('id', item.id);
            createBodyCopy(body);
            item.setAttribute('open', 'false');
            this.container.items.push(item);
            this.container.selectors.push(head);
            this.container.contents.push(body);
            // set click functionality to categories
            this.container.selectors[i].addEventListener('click', function () {
                if (barrel.isTransitioning) return;
                if (barrel.getRes() == 'pc')
                    if (barrel.selectedCategory != -1 && i != barrel.selectedCategory)
                        return;
                this.selectedCategory = i;
                barrel.isTransitioning = true;
                barrel.setCategory(i);
            });
        }
        // Set the barrel layout.
        this.columnCount = Number.parseInt(this.main.getAttribute('row'));
        this.rowCount = Math.round(barrel.container.items.length / this.columnCount);
        // Add an ika-responsiveness listener
        ikaResponsive.registerListener(function(val) {
            barrel.resize(val);
        });
        barrel.resize(ikaResponsive.a);
    }
};