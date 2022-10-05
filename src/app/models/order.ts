import { CartLine } from "./cartLine";

export class Order{
    public orderId?: number;
    public name?: string;
    public email?: string;
    public address?: string;
    public city?: string;
    public country?: string;
    public zip?: string;
    public isShipped?: boolean;
    public lines?: CartLine[];
}