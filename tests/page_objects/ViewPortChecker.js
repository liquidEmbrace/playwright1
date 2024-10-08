export class ViewPortChecker {
    constructor(page){
        this.page = page;
    }

    isDesktopViewport = async () => {
        const viewSize = this.page.viewportSize();
        return viewSize >= 600;
    }
}