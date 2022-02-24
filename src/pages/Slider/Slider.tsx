import * as React from 'react';
import ImageSlider, { Image} from '../../components/ImageSlider';
import { IImageSliderOnFocusChangeEventData } from '../../components/ImageSlider/ImageSlider';


import './Slider.scss';

export interface ISliderProps {}
export interface ISliderState {
    images: string[],
    backgroundIndex: number
}

interface imageInfo{
    href: string,
    alt: string
}

export default class Slider extends React.Component<ISliderProps, ISliderState> {
    public constructor(props: ISliderProps){
        super(props);

        // init state
        this.state = {
            images: [],
            backgroundIndex: NaN
        }
    }
    
    private async loadListImage() {
        const req = await fetch(
                '/data/images.json',
                {
                    method: 'GET'
                }
        );

        const imageInfos:imageInfo[] = await req.json();

        let images:string[] = imageInfos.map(item => item.href)
 
        if(images.length === 0) return;

        this.setState({
            images: images,
            backgroundIndex: 0
        });
    }

    private onImageSliderFocusChangeHandle = (e:IImageSliderOnFocusChangeEventData) => {
        if(e.index >= this.state.images.length) return;

        this.setState({
            backgroundIndex: e.index
        });
    }

    public componentDidMount(){
        this.loadListImage();
    }

    public render() {
        // render image
        const images = this.state.images.map((url, index) => {
            return <Image key={index} src={url} />;
        });

        const backgrounds = this.state.images.map((url, index) => {
            if(isNaN(this.state.backgroundIndex)) return undefined;

            const focus:string = index === this.state.backgroundIndex ? 'focus' : '';

            return (
                <div key={index} className={`background-wrap ${focus}`}>
                    <div
                        className='background'
                        style={{
                            backgroundImage: `url('${url}')`
                        }}
                    ></div>
                </div>
            )
        });

        return (
            <div className='page slider'>
                <div className='background-container'>
                    {backgrounds}
                </div>
                <section>
                    <ImageSlider
                        onFocusChange={this.onImageSliderFocusChangeHandle}
                    >
                        {images}
                    </ImageSlider>

                    
                    {/* <ImageSlider focus={1}>
                        <Image src='link of image'>
                            your code(option)
                        </Image>
                        <Image>
                            <div>
                                your code
                            </div>
                        </Image>
                    </ImageSlider> */}

                </section>
            </div>
        );
    }
}
