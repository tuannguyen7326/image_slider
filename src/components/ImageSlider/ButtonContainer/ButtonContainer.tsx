import * as React from 'react';
import arrowImage from './arrow.png';

import './ButtonContainer.scss';

export type TButtonType = 'left' | 'right' | 'both';


export interface IButtonContainerProps {
    buttonType: TButtonType;
    onClick?: (buttonType: TButtonType) => void;
}

class ButtonContainer extends React.PureComponent<IButtonContainerProps> {
    private listButtonClassName(): TButtonType[] {
        if (this.props.buttonType === 'both') {
            return ['left', 'right'];
        }

        return [this.props.buttonType];
    }

    private makeHandleButton = (buttonType: TButtonType) => {
        return () => {
            if (!this.props.onClick) return;
            this.props.onClick(buttonType);
        };
    };

    public render() {
        return (
            <div className='button-container'>
                {this.listButtonClassName().map((buttonType: TButtonType) => {
                    return (
                        <button
                            key={buttonType}
                            className={buttonType}
                            onClick={this.makeHandleButton(buttonType)}
                            type='button'
                        ></button>
                    );
                })}
            </div>
        );
    }
}

export default ButtonContainer;
