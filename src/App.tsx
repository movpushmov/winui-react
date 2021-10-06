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
import {CheckBox} from "./lib/BasicInput/CheckBox/CheckBox";
import {Tooltip} from "./lib/StatusAndInfo/Tooltip/Tooltip";
import {TextBlock} from "./lib/Text/TextBlock";
import {InfoBar} from "./lib/StatusAndInfo/InfoBar/InfoBar";
import {InfoBadge} from "./lib/StatusAndInfo/InfoBadge/InfoBadge";
import {ProgressRing} from "./lib/StatusAndInfo/ProgressRing/ProgressRing";

const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}

const columnStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
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

            <div style={rowStyle}>
                <CheckBox/>
                <CheckBox disabled/>
                <CheckBox isThreeState/>
                <CheckBox isThreeState content="Check Box with content"/>
            </div>

            <TitleBlock type="title">Radio Button</TitleBlock>
            <TitleBlock type="title">Slider</TitleBlock>
            <TitleBlock type="title">Color Picker</TitleBlock>

            <TitleBlock type="title">Simple Tooltip</TitleBlock>

            <div style={rowStyle}>
                <Tooltip content="I'm tooltip!">
                    <Button>Hello! I'm button with tooltip!</Button>
                </Tooltip>
            </div>

            <TitleBlock type="title">Info Bar</TitleBlock>

            <div style={columnStyle}>
                <InfoBar
                    title="Info Bar"
                    message="Simple info bar with title & description."
                />
                <InfoBar
                    severity="success"
                    title="Info Bar"
                    style={{ marginTop: '8px' }}
                />
                <InfoBar
                    severity="warning"
                    title="Info Bar"
                    style={{ marginTop: '8px' }}
                />
                <InfoBar
                    severity="error"
                    title="Info Bar"
                    style={{ marginTop: '8px' }}
                />

                <InfoBar
                    title="Closable Info Bar"
                    message="Simple info bar with title & description."
                    closable
                    style={{ marginTop: '8px' }}
                />
                <InfoBar
                    title="Closable Info Bar"
                    message="Simple info bar with title & description."
                    severity="success"
                    closable
                    style={{ marginTop: '8px' }}
                />
                <InfoBar
                    title="Closable Info Bar"
                    message="Simple info bar with title & description."
                    severity="warning"
                    closable
                    style={{ marginTop: '8px' }}
                />
                <InfoBar
                    title="Closable Info Bar"
                    message="Simple info bar with title & description."
                    severity="error"
                    closable
                    style={{ marginTop: '8px' }}
                />

                <InfoBar
                    title="Info Bar with long description."
                    message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
                    severity="error"
                    layout="column"
                    closable
                    style={{ marginTop: '8px' }}
                />
            </div>

            <TitleBlock type="title">Info Badge</TitleBlock>

            <div style={columnStyle}>
                <InfoBadge value="50" style={{ marginBottom: '12px' }}>
                    <Button>
                        Button with badge
                    </Button>
                </InfoBadge>

                <div style={rowStyle}>
                    <TextBlock>Standalone badge</TextBlock>

                    <InfoBadge value="50" style={{ marginLeft: '16px' }}/>
                </div>

                <div style={rowStyle}>
                    <TextBlock>Another types of badge</TextBlock>

                    <InfoBadge value="50" style={{ marginLeft: '16px' }}/>
                    <InfoBadge value="50" type="informational" style={{ marginLeft: '16px' }}/>
                    <InfoBadge value="50" type="success" style={{ marginLeft: '16px' }}/>
                    <InfoBadge value="50" type="critical" style={{ marginLeft: '16px' }}/>
                    <InfoBadge value="50" type="caution" style={{ marginLeft: '16px' }}/>
                </div>
            </div>

            <TitleBlock type="title">Progress Ring</TitleBlock>

            <div style={columnStyle}>
                <ProgressRing active={true}/>
                <ProgressRing indeterminate value={100} />
                <ProgressRing active={true} size="l" />
                <ProgressRing active={true} size="s" />
            </div>

            <TitleBlock type="title">Progress Bar</TitleBlock>
        </div>
    );
}

export default App;
