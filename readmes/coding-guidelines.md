# coding guidelines

- small components FTW
- sync with `main` often
- every component **_must_** have examples
- every component **_must_** have tests (ideally proving the tickets Acceptance Criteria)
- prefer `interface` over `type`
- prefer react hooks over react classes
- name prop definitions well

:heavy_check_mark:
```
interface IAwesomeComponent { /* ... */ }
export const AwesomeComponent = ({ /* ... */ }: IAwesomeComponent) => { /* ... */ }
```
:x:
```
interface Props { /* ... */ }
export const AwesomeComponent = ({ /* ... */ }: Props) => { /* ... */ }
```

- deconstruct the props

:heavy_check_mark:
```
interface IAwesomeComponent {
  goodname: string;
  excellentname: number;
}
export const AwesomeComponent = ({
  goodname,
  excellentname,
  ...rest
}: IAwesomeComponent) => { /* ... */ }
```
:x:
```
interface IAwesomeComponent {
  goodname: string;
  excellentname: number;
}
export const AwesomeComponent = (props: IAwesomeComponent) => { /* ... */ }
```

- **do** export your named component (`export const MyComponent = () => {}`), _never_ `export default`
- FOLLOW THE [ACCESSIBILITY GUIDELINES](./accessibility-guidelines.md)
