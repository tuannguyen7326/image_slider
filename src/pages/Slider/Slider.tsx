import * as React from 'react';
import ImageSlider, { Image } from '../../components/ImageSlider';

export interface ISliderProps {}
export interface ISliderState {
    images: string[]
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
            images: []
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
 
        this.setState({
            images: images
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

        return (
            <div className='page slider'>
                <section>
                    <ImageSlider focus={2}>{images}</ImageSlider>
                </section>
            </div>
        );
    }
}
