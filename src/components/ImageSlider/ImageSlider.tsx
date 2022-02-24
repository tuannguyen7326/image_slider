import * as React from 'react';

import ButtonContainer from './ButtonContainer';
import { TButtonType } from './ButtonContainer/ButtonContainer';
import ImageContainer from './ImageContainer';
import NavContainer from './NavContainer';

import './ImageSlider.scss';

export interface IImageSliderProps {
    focus?: number;
    interval?: number;
}

export interface IImageSliderState {
    focus: number;
}

export default class ImageSlider extends React.PureComponent<
    IImageSliderProps,
    IImageSliderState
> {
    private length: number = this.countNumberOfChildren();
    private loopId?: NodeJS.Timer;

    public constructor(props: IImageSliderProps) {
        super(props);

        this.state = {
            focus: this.props.focus ?? 0,
        };
    }

    private countNumberOfChildren(): number {
        if (!this.props.children) return 0; // children is undefined

        if (!Array.isArray(this.props.children)) return 1; // the children has an element

        return this.props.children.length;
    }

    // return index of next image from list image
    private nextNumber = (): number => {
        const n = this.state.focus + 1;
        if (n >= this.length) return 0;
        return n;
    };

    // return index of pre image from list image
    private preNumber = (): number => {
        const n = this.state.focus - 1;
        if (n < 0) return this.length - 1;
        return n;
    };

    // EVENT HANDLE
    private buttonContainerHandleClick = (buttonType: TButtonType) => {
        this.setState({
            focus: buttonType === 'left' ? this.preNumber() : this.nextNumber(),
        });
    };

    private imageSliderHandleMouseEnter = () => {
        this.stopLoop();
    };

    private imageSliderHandleMouseLeave = () => {
        this.startLoop();
    };

    private navHandleClick = (index: number) => {
        this.setState({
            focus: index,
        });
    }

    // LOOP
    private stopLoop = () => {
        if (!this.loopId) return;
        clearInterval(this.loopId);
    };

    private startLoop = () => {
        this.loopId = setInterval(this.loop, this.props.interval ?? 3000);
    };

    private loop = () => {
        this.setState({
            focus: this.nextNumber(),
        });
    };

    //
    public componentDidMount() {
        this.startLoop();
    }

    public componentWillUnmount() {
        this.stopLoop();
    }

    public componentDidUpdate(){
        this.length = this.countNumberOfChildren();
    }

    public render() {
        return (
            <div
                className='image-slider'
                onMouseEnter={this.imageSliderHandleMouseEnter}
                onMouseLeave={this.imageSliderHandleMouseLeave}
            >
                <ButtonContainer
                    buttonType='both'
                    onClick={this.buttonContainerHandleClick}
                />
                <ImageContainer
                    focus={this.state.focus}
                    children={this.props.children}
                />
                <NavContainer
                    focus={this.state.focus}
                    length={this.countNumberOfChildren()}
                    onClick={this.navHandleClick}
                />
            </div>
        );
    }
}
