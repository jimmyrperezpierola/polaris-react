# Migrating from v3 to v4

Polaris v4 contains mostly internal changes and has simple migration paths. This guide contains multiple steps on how to deal with our breaking changes in your application.

**Note:** This migration guide is v3, but may apply for v2 as well.

- [Testing](#testing)
- [API Changes](#api-changes)
  - [AppProvider](#appprovider)
    - [i18n](#i18n)
  - [Navigation](#navigation)
    - [iconBody](#icon-body)
  - [ChoiceList](#choicelist)
    - [title](#title)
  - [Card](#card)
    - [secondaryFooterAction](#secondaryfooteraction)
  - [Select](#select)
    - [groups](#groups)
  - [Icon](#icon)
    - [source](source)
    - [untrusted](#untrusted)
- [Removed Exports/Components](#removed-exports/components)
  - [WithContext](#with-context)
  - [WithRef](#with-ref)
  - [Autocomplete.ComboBox.TextField](#autocomplete-combobox-textfield)
  - [Autocomplete.ComboBox.OptionList](#autocomplete-combobox-optionlist)
  - [Navigation.UserMenu](#navigation-usermenu)
- [Dependencies](#dependencies)
- [Typescript](#typescript)

## Testing

We've migrated to react new context API as well as restructured our entire context structure. To keep upto date use our test provider.

In v3, you could hook into our context types.

**Note:** These examples use enzyme. See [our examples](https://github.com/Shopify/polaris-react/tree/master/examples) for other testing libraries.

```jsx
// v3
import merge from 'lodash/merge';
import {shallow, mount} from 'enzyme';
import {createPolarisContext, polarisContextTypes} from '@shopify/polaris';

function mergeAppProviderOptions(options) {
  const context = createPolarisContext();

  return merge(
    {},
    {
      context,
      childContextTypes: polarisContextTypes,
    },
    options,
  );
}

export function mountWithAppProvider(node, options) {
  return mount(node, mergeAppProviderOptions(options));
}

export function shallowWithAppProvider(node, options) {
  return shallow(node, mergeAppProviderOptions(options)).dive(options);
}
```

Moving forward you'll want to wrap your code in our test provider.

```jsx
// v4
import {mount} from 'enzyme';
import {PolarisTestProvider} from '@shopify/polaris';

export function mountWithPolaris(node) {
  return mount<P>(
    <PolarisTestProvider {...context}>{node}</PolarisTestProvider>,
  );
}
```

## API Changes

### AppProvider

#### i18n

i18n is now a required prop and Polaris includes [many translation](https://github.com/Shopify/polaris-react/blob/master/locales) to support internationalization.

```jsx
import fr from '@shopify/polaris/locales/fr.json';
...
<AppProvider i18n={fr}>
...
```

### Navigation

#### iconBody

Pass a string to the icon prop instead.

### ChoiceList

#### title

Title is now a required prop for accessibility concerns, however it can be hidden with the titleHidden prop to keep your UI the same.

```jsx
const choiceListMarkup = (
  <ChoiceList
    title={'Company name'}
    choices={[
      {label: 'Hidden', value: 'hidden'},
      {label: 'Optional', value: 'optional'},
      {label: 'Required', value: 'required'},
    ]}
    selected={['hidden']}
  />
);
```

### Card

#### secondaryFooterAction

`secondaryFooterAction` has been removed in favor of `secondaryFooterActions` which behaves the same expect it'll accept an array of actions.

```jsx
<Card secondaryFooterActions={[{content: 'Dismiss'}]}>Polaris</Card>
```

### Icon

#### source

Support for passing string into `source` to load bundled icons has been removed. Now you can load icons from `@shopify/polaris-icons`.

```jsx
import {AccessibilityMajorMonotone} from '@shopify/polaris-icons';
...
<Icon source={AccessibilityMajorMonotone} />
...
```

Using an `SvgSource` shaped object has been removed as well to load an icon imported using shopify's legacy icon loader. You must update sewing-kit to at least v0.82.0 which replaced the legacy loader with using SVGR. Loading an react element as the icon's source has been replaced with accepting a react components that returns an SVG element.

```jsx
...
function Hamburger () {
  return (
    ...
  )
}

...
<Icon source={Hamburger} />
...

```

#### untrusted

All icon's rendered with a string as the source will be considered untrusted.

## Removed Exports/Components

### WithContext

`WithContext` as an internal abstraction used for class components. Use hooks or contextType instead.

```jsx
// hooks
function Test() {
  const testContext = useContext(TestContext);
  return <h1>{testContext}</h1>;
}

// contextType
const TestContext = createContext('Polaris');

class Test extends Component {
  static contextType = TestContext;

  render() {
    const testContext = this.context;
    return <h1>{testContext}</h1>;
  }
}
```

### WithRef

`WithRef` was an internal component used to place refs on components wrapped in higher order components. Use functional components instead.

```jsx
function Input(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} {...props} />;
}
const ReffableInput = forwardRef(Input);

function App() {
  const reffableInput = useRef();

  useEffect(() => {
    reffableInput.current.focus();
  }, []);

  return (
    <ReffableInput ref={reffableInput} onFocus={() => console.log('focused')} />
  );
}
```

### Autocomplete.ComboBox.TextField

Use `Autocomplete.TextField` instead.

```jsx
...
const textFieldMarkup = (
  <Autocomplete.TextField
    label="Example"
  />
);
...
```

### Autocomplete.ComboBox.OptionList

Use `OptionList` instead.

```jsx
...
const optionListMarkup = (
  <OptionList
    onChange={() => {}}
    selected={[]}
  />
);
...
```

### Navigation.UserMenu

Use `TopBar.UserMenu` instead

```jsx
const userMenuMarkup = (
  <TopBar.UserMenu
    actions={[]}
    name="Andrew"
    initials="AM"
    open
    onToggle={() => {}}
  />
);
```

## Dependencies

React/ReactDOM are peer dependencies of Polaris and have been bumped to 16.8.6 to enable the use of hooks. Use `yarn` or `npm` to install a recent version of react.

```bash
# yarn
yarn add react react-dom

# npm
npm i react react-dom
```

## Typescript

The method for importing react has changed to use default imports.

```jsx
// old
import * as React from 'react';
// new
import React from 'react';
```

Because of this consuming typescript applications must enable [esModuleInterop](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) or use the esModuleInterop command line option

```js
// tsconfig.json
{
  ...
  "compilerOptions": {
    ...
    "esModuleInterop": true,
    ...
  }
}
```

```bash
# CLI
tsc --esModuleInterop ...
```
