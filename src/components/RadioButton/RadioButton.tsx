import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Choice, {helpTextID} from '../Choice';
import styles from './RadioButton.scss';

export interface BaseProps {
  /** Indicates the ID of the element that describes the the radio button*/
  ariaDescribedBy?: string;
  /** Label for the radio button */
  label: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Additional text to aid in use */
  helpText?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Callback when the radio button is toggled */
  onChange?(newValue: boolean, id: string): void;
  /** Callback when radio button is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface Props extends BaseProps {}

const getUniqueID = createUniqueIDFactory('RadioButton');

export default function RadioButton({
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id = getUniqueID(),
  name = id,
  value,
}: Props) {
  function handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(currentTarget.checked, id);
  }

  const describedBy: string[] = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length
    ? describedBy.join(' ')
    : undefined;

  return (
    <Choice
      label={label}
      labelHidden={labelHidden}
      disabled={disabled}
      id={id}
      helpText={helpText}
    >
      <span className={styles.RadioButton}>
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          disabled={disabled}
          className={styles.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby={ariaDescribedBy}
        />
        <span className={styles.Backdrop} />
        <span className={styles.Icon} />
      </span>
    </Choice>
  );
}
