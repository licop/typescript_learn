declare module 'jquery' {
    interface JqueryInstace {
        html: (html: string) => JqueryInstace
    }
    interface JQuery {
        $(parms: () => void): void;
        $(params: string): JqueryInstace;
    }
    
    // 对对象类型进行定义，以及对类进行类型定义，以及命名空间的嵌套
    namespace $ {
        namespace fn {
            class init {}
        }
    }
    export = $;
}


