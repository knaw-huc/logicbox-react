import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {LogicBox, LogicBoxType} from '@knaw-huc/logicbox-react';
import './index.css';

const logicBoxAInit: LogicBoxType<'conditions', { hello: string }> = {
    type: 'and',
    conditions: [
        {
            type: 'or',
            conditions: [
                {hello: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit tortor ut semper dictum. Vivamus gravida eu tellus scelerisque tristique. Nullam vitae vehicula urna, sit amet aliquet sem. Ut et eros quis neque lobortis cursus. Nunc rutrum quis leo et volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla id odio lectus.'},
                {hello: 'Nulla est enim, vestibulum eu odio non, elementum eleifend ex. Phasellus mollis imperdiet semper. Duis dictum, mauris non ullamcorper auctor, velit nunc sollicitudin urna, tincidunt sollicitudin purus odio quis ante. Sed dapibus nisi mi, ut auctor elit consectetur ut. Praesent tincidunt et risus sed pretium. Vivamus in rutrum libero. Aliquam in posuere ex, sit amet efficitur dolor. Cras eu mauris nec mi dignissim feugiat. Nunc luctus, velit vitae pretium maximus, nulla mauris pharetra lorem, in placerat ligula purus sit amet justo. Proin id magna nec justo maximus scelerisque auctor ac magna. Etiam dolor tellus, pulvinar vel rhoncus sed, facilisis a nibh. Morbi vel lacus non sapien faucibus sodales non id augue. Proin sed augue quis turpis sodales hendrerit. Sed turpis purus, dignissim vitae pretium in, lacinia laoreet mi. Integer leo dolor, mollis sit amet fermentum convallis, molestie quis magna. Duis id venenatis mi, quis vehicula ligula.'},
                {hello: 'Sed nec eleifend odio. Donec vel accumsan augue. Vestibulum vehicula malesuada diam, ac maximus lorem feugiat ac. In ac tincidunt velit. Pellentesque facilisis nulla quis sem consequat, sed mattis ligula gravida. Proin feugiat augue et odio placerat eleifend. Phasellus posuere dictum aliquet. Nunc at risus vel velit finibus accumsan. Suspendisse feugiat posuere gravida. Vestibulum sit amet massa a neque pellentesque dapibus a ac massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean accumsan odio vitae lorem posuere, ac tempus nibh porta.'}],
        }, {
            type: 'or',
            conditions: [
                {
                    type: 'and',
                    conditions: [
                        {hello: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum accumsan dictum leo vel vulputate. Vivamus tristique tincidunt lectus, a accumsan augue suscipit id. Sed a ullamcorper ligula. Nam porta congue dapibus. Aliquam sed massa condimentum justo mattis maximus nec quis sem. Nunc ac magna a eros facilisis finibus.'},
                        {hello: 'Vestibulum venenatis ante condimentum neque eleifend congue eu sed dolor. Suspendisse tempor volutpat imperdiet. Quisque sit amet tellus interdum, dictum tellus et, lacinia ligula. Nam tempor tellus vitae lectus lobortis, ac laoreet lorem accumsan. Nulla quam nibh, tristique et odio at, consectetur tempus ipsum. Phasellus non fermentum mauris. Pellentesque suscipit efficitur nibh eget fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque dictum metus sit amet risus auctor consectetur. Aliquam ac orci vitae eros condimentum aliquet. Vestibulum eu felis varius, vulputate lorem non, luctus odio. Vivamus consequat arcu id urna ultrices, quis congue ipsum hendrerit. Mauris quis massa dolor.'}
                    ],
                },
                {
                    type: 'and',
                    conditions: [
                        {hello: 'Quisque iaculis iaculis tincidunt. Sed non justo id enim suscipit pellentesque id eu metus. Etiam non urna varius, molestie nulla sed, tincidunt nibh. Cras lacinia, lorem eu accumsan mollis, lectus justo placerat quam, ut congue tellus orci vel lacus. Nam diam leo, pellentesque eu turpis vel, venenatis sagittis nibh. Vestibulum ac dui ac lectus mattis vestibulum. Vestibulum pellentesque, purus ac viverra cursus, sapien tellus ultrices augue, id tempor risus ante sit amet nisi. Donec interdum accumsan lacus, non sodales urna consectetur a. Maecenas id mauris magna.'},
                        {hello: 'Fusce molestie quis eros eu lobortis. Aenean in tincidunt augue. Duis aliquam ipsum eget libero commodo, quis lobortis eros blandit. Etiam convallis hendrerit velit, id accumsan erat mattis vitae. Suspendisse aliquet suscipit vehicula. Etiam eget molestie felis. Vivamus finibus ullamcorper dignissim. Nam a dolor porttitor, lobortis erat et, hendrerit ex. Ut sit amet ligula vitae turpis tempus tempor. Donec eget arcu dapibus sem sollicitudin tempus sit amet sit amet tortor. Fusce pellentesque tincidunt faucibus. Nulla sem erat, ornare et nibh nec, vulputate blandit velit. Morbi pellentesque dolor a metus pellentesque, mollis laoreet ex consectetur.'}
                    ],
                }
            ]
        }
    ]
};

const logicBoxBInit: LogicBoxType<'conditions', { hello: string }> = {
    type: 'and',
    conditions: [
        {
            type: 'or',
            conditions: [
                {hello: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit tortor ut semper dictum. Vivamus gravida eu tellus scelerisque tristique. Nullam vitae vehicula urna, sit amet aliquet sem. Ut et eros quis neque lobortis cursus. Nunc rutrum quis leo et volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla id odio lectus.'},
                {hello: 'Nulla est enim, vestibulum eu odio non, elementum eleifend ex. Phasellus mollis imperdiet semper. Duis dictum, mauris non ullamcorper auctor, velit nunc sollicitudin urna, tincidunt sollicitudin purus odio quis ante. Sed dapibus nisi mi, ut auctor elit consectetur ut. Praesent tincidunt et risus sed pretium. Vivamus in rutrum libero. Aliquam in posuere ex, sit amet efficitur dolor. Cras eu mauris nec mi dignissim feugiat. Nunc luctus, velit vitae pretium maximus, nulla mauris pharetra lorem, in placerat ligula purus sit amet justo. Proin id magna nec justo maximus scelerisque auctor ac magna. Etiam dolor tellus, pulvinar vel rhoncus sed, facilisis a nibh. Morbi vel lacus non sapien faucibus sodales non id augue. Proin sed augue quis turpis sodales hendrerit. Sed turpis purus, dignissim vitae pretium in, lacinia laoreet mi. Integer leo dolor, mollis sit amet fermentum convallis, molestie quis magna. Duis id venenatis mi, quis vehicula ligula.'},
            ],
        }, {
            type: 'or',
            conditions: [
                {
                    type: 'and',
                    conditions: [
                        {hello: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum accumsan dictum leo vel vulputate. Vivamus tristique tincidunt lectus, a accumsan augue suscipit id. Sed a ullamcorper ligula. Nam porta congue dapibus. Aliquam sed massa condimentum justo mattis maximus nec quis sem. Nunc ac magna a eros facilisis finibus.'},
                        {hello: 'Vestibulum venenatis ante condimentum neque eleifend congue eu sed dolor. Suspendisse tempor volutpat imperdiet. Quisque sit amet tellus interdum, dictum tellus et, lacinia ligula. Nam tempor tellus vitae lectus lobortis, ac laoreet lorem accumsan. Nulla quam nibh, tristique et odio at, consectetur tempus ipsum. Phasellus non fermentum mauris. Pellentesque suscipit efficitur nibh eget fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque dictum metus sit amet risus auctor consectetur. Aliquam ac orci vitae eros condimentum aliquet. Vestibulum eu felis varius, vulputate lorem non, luctus odio. Vivamus consequat arcu id urna ultrices, quis congue ipsum hendrerit. Mauris quis massa dolor.'}
                    ],
                },
                {
                    type: 'and',
                    conditions: [
                        {hello: 'Quisque iaculis iaculis tincidunt. Sed non justo id enim suscipit pellentesque id eu metus. Etiam non urna varius, molestie nulla sed, tincidunt nibh. Cras lacinia, lorem eu accumsan mollis, lectus justo placerat quam, ut congue tellus orci vel lacus. Nam diam leo, pellentesque eu turpis vel, venenatis sagittis nibh. Vestibulum ac dui ac lectus mattis vestibulum. Vestibulum pellentesque, purus ac viverra cursus, sapien tellus ultrices augue, id tempor risus ante sit amet nisi. Donec interdum accumsan lacus, non sodales urna consectetur a. Maecenas id mauris magna.'},
                        {hello: 'Fusce molestie quis eros eu lobortis. Aenean in tincidunt augue. Duis aliquam ipsum eget libero commodo, quis lobortis eros blandit. Etiam convallis hendrerit velit, id accumsan erat mattis vitae. Suspendisse aliquet suscipit vehicula. Etiam eget molestie felis. Vivamus finibus ullamcorper dignissim. Nam a dolor porttitor, lobortis erat et, hendrerit ex. Ut sit amet ligula vitae turpis tempus tempor. Donec eget arcu dapibus sem sollicitudin tempus sit amet sit amet tortor. Fusce pellentesque tincidunt faucibus. Nulla sem erat, ornare et nibh nec, vulputate blandit velit. Morbi pellentesque dolor a metus pellentesque, mollis laoreet ex consectetur.'}
                    ],
                }
            ]
        }
    ]
};

const logicBoxCInit: LogicBoxType<'conditions', { hello: string }> = {
    type: 'and',
    conditions: [
        {hello: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit tortor ut semper dictum. Vivamus gravida eu tellus scelerisque tristique. Nullam vitae vehicula urna, sit amet aliquet sem. Ut et eros quis neque lobortis cursus. Nunc rutrum quis leo et volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla id odio lectus.'},
        {hello: 'Nulla est enim, vestibulum eu odio non, elementum eleifend ex. Phasellus mollis imperdiet semper. Duis dictum, mauris non ullamcorper auctor, velit nunc sollicitudin urna, tincidunt sollicitudin purus odio quis ante. Sed dapibus nisi mi, ut auctor elit consectetur ut. Praesent tincidunt et risus sed pretium. Vivamus in rutrum libero. Aliquam in posuere ex, sit amet efficitur dolor. Cras eu mauris nec mi dignissim feugiat. Nunc luctus, velit vitae pretium maximus, nulla mauris pharetra lorem, in placerat ligula purus sit amet justo. Proin id magna nec justo maximus scelerisque auctor ac magna. Etiam dolor tellus, pulvinar vel rhoncus sed, facilisis a nibh. Morbi vel lacus non sapien faucibus sodales non id augue. Proin sed augue quis turpis sodales hendrerit. Sed turpis purus, dignissim vitae pretium in, lacinia laoreet mi. Integer leo dolor, mollis sit amet fermentum convallis, molestie quis magna. Duis id venenatis mi, quis vehicula ligula.'},
        {hello: 'Sed nec eleifend odio. Donec vel accumsan augue. Vestibulum vehicula malesuada diam, ac maximus lorem feugiat ac. In ac tincidunt velit. Pellentesque facilisis nulla quis sem consequat, sed mattis ligula gravida. Proin feugiat augue et odio placerat eleifend. Phasellus posuere dictum aliquet. Nunc at risus vel velit finibus accumsan. Suspendisse feugiat posuere gravida. Vestibulum sit amet massa a neque pellentesque dapibus a ac massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean accumsan odio vitae lorem posuere, ac tempus nibh porta.'}
    ]
};

createRoot(document.getElementById('root')!).render(<App/>);

function App() {
    const [logicBox, setLogicBox] = useState(logicBoxAInit);
    const [allowAdd, setAllowAdd] = useState(true);
    const [exactNoElements, setExactNoElements] = useState(0);

    const add = () => ({hello: 'Added!'});

    function Renderer({index, isCollapsed, element}: {
        index: number[];
        isCollapsed: boolean;
        element: {
            hello: string;
        };
    }) {
        return (
            <div>
                <div className="id">
                    {index.join(' - ')}
                </div>

                {!isCollapsed && <p>{element.hello}</p>}
            </div>
        );
    }

    return (
        <div>
            <div className="toggle">
                <button onClick={_ => setLogicBox(logicBoxAInit)}>Use example A</button>
                <button onClick={_ => setLogicBox(logicBoxBInit)}>Use example B</button>
                <button onClick={_ => setLogicBox(logicBoxCInit)}>Use example C</button>
            </div>

            <div className="options">
                <label>
                    Allow add
                    <input type="checkbox" checked={allowAdd}
                           onChange={_ => setAllowAdd(prev => !prev)}/>
                </label>

                <label>
                    Set exact number of elements
                    <input type="number" value={exactNoElements}
                           onChange={e => setExactNoElements(parseInt(e.target.value))}/>
                </label>
            </div>

            <LogicBox logicBox={logicBox}
                      elementsKey="conditions"
                      LeafComponent={Renderer}
                      add={allowAdd ? add : undefined}
                      exactNumberOfElements={exactNoElements || undefined}
                      onChange={(newLogicBox, _oldLogicBox) => setLogicBox(newLogicBox)}/>
        </div>
    );
}
