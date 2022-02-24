import * as React from 'react';

export interface IHomeProps {}

export default class Home extends React.Component<IHomeProps> {
    public render() {
        return <div className='page home-page'>this is home page</div>;
    }
}
