import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {polarisAppProviderContextTypes} from 'components/AppProvider';
import {createThemeContext, ThemeContext} from 'components/ThemeProvider';
import {createAppProviderContext, Button, Image} from 'components';
import {DiscardConfirmationModal} from '../components';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  describe('discardAction', () => {
    it('renders a button with the discardAction details', () => {
      const discardAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      const button = contextualSaveBar.find(Button);
      expect(button.prop('onClick')).toBe(discardAction.onAction);
      expect(button.prop('children')).toBe(discardAction.content);
    });

    describe('discardConfirmationModal is false', () => {
      it('calls the discardAction when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: false,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button).simulate('click');
        expect(discardAction.onAction).toHaveBeenCalled();
      });

      it('does not render a DiscardConfirmationModal', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: false,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        expect(contextualSaveBar.find(DiscardConfirmationModal)).toHaveLength(
          0,
        );
      });
    });

    describe('discardConfirmationModal is true', () => {
      it('does not call the discardAction when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button).simulate('click');
        expect(discardAction.onAction).not.toHaveBeenCalled();
      });

      it('renders a DiscardConfirmationModal with an `open` prop set to false', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const discardConfirmationModal = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        ).find(DiscardConfirmationModal);

        expect(discardConfirmationModal.prop('open')).toBe(false);
      });

      it('sets the DiscardConfirmationModal `open` prop to true when the discard button is clicked', () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button).simulate('click');
        const discardConfirmationModal = contextualSaveBar.find(
          DiscardConfirmationModal,
        );
        expect(discardConfirmationModal).toHaveLength(1);
        expect(discardConfirmationModal.prop('open')).toBe(true);
      });

      it("sets the DiscardConfirmationModal `open` prop to false when it's `onCancel` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        const discardConfirmationModal = contextualSaveBar.find(
          DiscardConfirmationModal,
        );
        trigger(discardConfirmationModal, 'onCancel');

        expect(discardConfirmationModal.prop('open')).toBe(false);
      });

      it("calls the discardAction prop when it's `onDiscard` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: jest.fn(),
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        contextualSaveBar.find(Button).simulate('click');
        const discardConfirmationModal = contextualSaveBar.find(
          DiscardConfirmationModal,
        );

        trigger(discardConfirmationModal, 'onDiscard');
        expect(discardAction.onAction).toHaveBeenCalled();
      });

      it("sets the DiscardConfirmationModal `open` prop to false when it's `onDiscard` handler is triggered", () => {
        const discardAction = {
          content: 'Discard',
          onAction: noop,
          discardConfirmationModal: true,
        };

        const contextualSaveBar = mountWithAppProvider(
          <ContextualSaveBar discardAction={discardAction} />,
        );

        const discardConfirmationModal = contextualSaveBar.find(
          DiscardConfirmationModal,
        );
        trigger(discardConfirmationModal, 'onDiscard');

        expect(discardConfirmationModal.prop('open')).toBe(false);
      });
    });
  });

  describe('saveAction', () => {
    it('renders a button with the saveAction details', () => {
      const saveAction = {
        content: 'Discard',
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} />,
      );

      const button = contextualSaveBar.find(Button);
      expect(button.prop('onClick')).toBe(saveAction.onAction);
      expect(button.prop('children')).toBe(saveAction.content);
    });
  });

  describe('default content', () => {
    it('renders a discard action with default text without content being provided', () => {
      const discardAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar discardAction={discardAction} />,
      );

      const discardButton = contextualSaveBar.find(Button);
      expect(discardButton.text()).toBe('Discard');
    });

    it('renders a save action with default text without content being provided', () => {
      const saveAction = {
        onAction: jest.fn(),
      };

      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar saveAction={saveAction} />,
      );

      const commitButton = contextualSaveBar.find(Button);
      expect(commitButton.text()).toBe('Save');
    });
  });

  describe('logo', () => {
    it('will render an image with the contextual save bar source', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        addPolarisContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).prop('source')).toBe(
        './assets/monochrome_shopify.svg',
      );
    });

    it('will render an image with the width provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        addPolarisContext({
          logo: {
            width: 200,
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '200px',
      );
    });

    it('will render the image with a default width if 0 is provided', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar />,
        addPolarisContext({
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 0,
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(contextualSaveBar.find(Image).get(0).props.style).toHaveProperty(
        'width',
        '104px',
      );
    });

    it('will not render the logo when content is aligned flush left', () => {
      const contextualSaveBar = mountWithAppProvider(
        <ContextualSaveBar alignContentFlush />,
        addPolarisContext({
          logo: {
            contextualSaveBarSource: './assets/monochrome_shopify.svg',
            width: 200,
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );

      expect(contextualSaveBar.find(Image).exists()).toBeFalsy();
    });
  });
});

function addPolarisContext(logo: ThemeContext) {
  const context = {
    ...createAppProviderContext(),
    ...createThemeContext(logo),
  };

  return {
    context,
    childContextTypes: polarisAppProviderContextTypes,
  };
}

function noop() {}
