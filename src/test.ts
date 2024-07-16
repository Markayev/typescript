import  'reflect-metadata'

function Inject(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata('a',1, target)
        const meta = Reflect.getMetadata('a', target)
        console.log(meta)
    }

}

function Prop(target: Object, name: string) {
    
}

@Inject('C')
export class c {
    @Prop props: number
}