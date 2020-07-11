export class Router {
    public static getParam(): string {
        return new URL(window.location.href).searchParams.get('id');
    }
}