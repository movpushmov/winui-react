import React, {CSSProperties} from 'react';
import './lib/winui.css'

import {Button} from "./lib/BasicInput/Button/Button";
import {TitleBlock} from "./lib/Text/TitleBlock";
import {Icon, IconType} from "./lib/Icons/Icon";
import {ToggleButton} from "./lib/BasicInput/ToggleButton/ToggleButton";
import { HyperlinkButton } from './lib/BasicInput/HyperlinkButton/HyperlinkButton';
import {DropDownButton} from "./lib/BasicInput/DropDownButton/DropDownButton";
import {SplitButton} from "./lib/BasicInput/SplitButton/SplitButton";
import {ToggleSplitButton} from "./lib/BasicInput/ToggleSplitButton/ToggleSplitButton";
import {ToggleSwitch} from "./lib/BasicInput/ToggleSwitch/ToggleSwitch";

const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}

function App() {
    return (
        <div style={{ display: "flex", flexDirection: "column", margin: '24px' }}>
            <TitleBlock type="title-large">WinUI 2.7 React Components</TitleBlock>
            <TitleBlock type="title">Button</TitleBlock>

            <div style={rowStyle}>
                <Button>Standard XAML Button</Button>
                <Button type="accent" iconRight={<Icon type={IconType.Calendar} style={{ marginLeft: '8px' }}/>} style={{ marginLeft: '16px' }}>Accent Style Button</Button>
                <Button
                    iconLeft={<Icon style={{ marginRight: '4px' }} type={IconType.DefenderApp}/>}
                    style={{ marginLeft: '16px' }}
                >
                    XAML Button With Icon
                </Button>

                <Button disabled style={{ marginLeft: '16px' }}>Disabled XAML Button</Button>
                <Button disabled type="accent" style={{ marginLeft: '16px' }}>Disabled Accent Style Button</Button>
            </div>

            <TitleBlock type="title">ToggleButton</TitleBlock>

            <div style={rowStyle}>
                <ToggleButton>Hello!</ToggleButton>
            </div>

            <TitleBlock type="title">HyperlinkButton</TitleBlock>

            <div style={rowStyle}>
                <HyperlinkButton>
                    <a href="https://google.com">Microsoft home page</a>
                </HyperlinkButton>
                <HyperlinkButton disabled style={{ marginLeft: '12px' }}>
                    <a href="https://google.com">Microsoft home page</a>
                </HyperlinkButton>
            </div>

            <TitleBlock type="title">Dropdown Button</TitleBlock>

            <div style={rowStyle}>
                <DropDownButton
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                >
                    Select some value.
                </DropDownButton>

                <DropDownButton
                    style={{ marginLeft: '12px' }}
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                    disabled
                >
                    Disabled DropDown Button
                </DropDownButton>
            </div>

            <TitleBlock type="title">Split Button</TitleBlock>

            <div style={rowStyle}>
                <SplitButton
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                >
                    Select some value.
                </SplitButton>

                <SplitButton
                    style={{ marginLeft: '12px' }}
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                    disabled
                >
                    Disabled DropDown Button
                </SplitButton>
            </div>

            <TitleBlock type="title">Toggle Split Button</TitleBlock>

            <div style={rowStyle}>
                <ToggleSplitButton
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                >
                    Select some value.
                </ToggleSplitButton>

                <ToggleSplitButton
                    style={{ marginLeft: '12px' }}
                    items={[
                        { icon: IconType.Send, name: 'Send', value: 5 },
                        { icon: IconType.Replay, name: 'Reply', value: 5 },
                        { icon: IconType.Calendar, name: 'Select date', value: 3 }
                    ]}
                    onSelect={(v) => console.log(v)}
                    disabled
                >
                    Disabled DropDown Button
                </ToggleSplitButton>
            </div>

            <TitleBlock type="title">Combo Box</TitleBlock>
            <TitleBlock type="title">Toggle Switch</TitleBlock>

            <div style={rowStyle}>
                <ToggleSwitch header="With header"/>
                <ToggleSwitch
                    header="With header & content"
                    style={{ marginLeft: '24px' }}
                    onContent="On"
                    offContent="Off"
                />
                <ToggleSwitch
                    header="Disabled toggle"
                    style={{ marginLeft: '24px' }}
                    disabled
                />
            </div>

            <TitleBlock type="title">Check Box</TitleBlock>
            <TitleBlock type="title">Radio Button</TitleBlock>
            <TitleBlock type="title">Slider</TitleBlock>
            <TitleBlock type="title">Color Picker</TitleBlock>
        </div>
    );
}

export default App;
