import React, { CSSProperties } from 'react'
import './lib/winui.css'

import { Button } from './lib/BasicInput/Button/Button'
import { TitleBlock } from './lib/Text/TitleBlock'
import { Icon, IconType } from './lib/Icons/Icon'
import { ToggleButton } from './lib/BasicInput/ToggleButton/ToggleButton'
import { HyperlinkButton } from './lib/BasicInput/HyperlinkButton/HyperlinkButton'
import { DropDownButton } from './lib/BasicInput/DropDownButton/DropDownButton'
import { SplitButton } from './lib/BasicInput/SplitButton/SplitButton'
import { ToggleSplitButton } from './lib/BasicInput/ToggleSplitButton/ToggleSplitButton'
import { ToggleSwitch } from './lib/BasicInput/ToggleSwitch/ToggleSwitch'
import { CheckBox, CheckBoxState } from './lib/BasicInput/CheckBox/CheckBox'
import { Tooltip } from './lib/StatusAndInfo/Tooltip/Tooltip'
import { TextBlock } from './lib/Text/TextBlock'
import { InfoBar } from './lib/StatusAndInfo/InfoBar/InfoBar'
import { InfoBadge } from './lib/StatusAndInfo/InfoBadge/InfoBadge'
import { ProgressRing } from './lib/StatusAndInfo/ProgressRing/ProgressRing'
import { ProgressBar } from './lib/StatusAndInfo/ProgressBar/ProgressBar'
import { Slider } from './lib/BasicInput/Slider/Slider'
import { RadioButtonGroup } from './lib/BasicInput/RadioButton/RadioButtonGroup'
import { RadioButton } from './lib/BasicInput/RadioButton/RadioButton'
import { ListView } from './lib/Collections/ListView/ListView'
import { ListViewItem } from './lib/Collections/ListView/ListViewItem'
import { GridView } from './lib/Collections/GridView/GridView'
import { GridViewItem } from './lib/Collections/GridView/GridViewItem'
import { TreeView } from './lib/Collections/TreeView/TreeView'
import { TreeNode } from './lib/Collections/TreeView/TreeNode'

const rowStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
}

const columnStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
}

const literals = {
	send: 'Send',
	reply: 'Reply',
	selectDate: 'Select date',
}

function App(): React.ReactElement {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', margin: '24px' }}>
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
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
				>
                    Select some value.
				</DropDownButton>

				<DropDownButton
					style={{ marginLeft: '12px' }}
					items={[
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
					disabled
				>
                    Disabled DropDown Button
				</DropDownButton>
			</div>

			<TitleBlock type="title">Split Button</TitleBlock>

			<div style={rowStyle}>
				<SplitButton
					items={[
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
				>
                    Select some value.
				</SplitButton>

				<SplitButton
					style={{ marginLeft: '12px' }}
					items={[
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
					disabled
				>
                    Disabled DropDown Button
				</SplitButton>
			</div>

			<TitleBlock type="title">Toggle Split Button</TitleBlock>

			<div style={rowStyle}>
				<ToggleSplitButton
					items={[
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
				>
                    Select some value.
				</ToggleSplitButton>

				<ToggleSplitButton
					style={{ marginLeft: '12px' }}
					items={[
						{ icon: IconType.Send, name: literals.send, value: 5 },
						{ icon: IconType.Replay, name: literals.reply, value: 5 },
						{ icon: IconType.Calendar, name: literals.selectDate, value: 3 },
					]}
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
				<CheckBox disabled value={CheckBoxState.Checked}/>
				<CheckBox isThreeState/>
				<CheckBox isThreeState content="Check Box with content"/>
			</div>

			<TitleBlock type="title">Radio Button</TitleBlock>

			<RadioButtonGroup>
				<RadioButton content="First"/>
				<RadioButton content="Second"/>
				<RadioButton content="Third"/>
			</RadioButtonGroup>

			<RadioButtonGroup>
				<RadioButton content="Disabled radio" disabled/>
				<RadioButton content="Disabled radio second" disabled/>
				<RadioButton content="Disabled radio active" disabled checked={true}/>
			</RadioButtonGroup>

			<TitleBlock type="title">Slider</TitleBlock>

			<div style={columnStyle}>
				<Slider max={1000} disabled/>

				<Slider header="Slider with header"/>
			</div>

			<TitleBlock type="title">Color Picker</TitleBlock>

			<TitleBlock type="title">Simple Tooltip</TitleBlock>

			<div style={rowStyle}>
				<Tooltip content="I'm tooltip!">
					<Button>Hello! I&apos;m button with tooltip!</Button>
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
				<ProgressRing determinate value={100} style={{ marginTop: '2%' }} />
				<ProgressRing active={true} size="l" style={{ marginTop: '2%' }} />
				<ProgressRing active={true} size="s" style={{ marginTop: '2%' }} />
			</div>

			<TitleBlock type="title">Progress Bar</TitleBlock>

			<div style={columnStyle}>
				<ProgressBar active={true}/>
				<ProgressBar determinate={true} style={{ marginTop: '5%' }} value={50}/>
			</div>

			<TitleBlock type="title">ListView</TitleBlock>

			<div style={columnStyle}>
				<ListView>
					<ListViewItem disabled>Hello!</ListViewItem>
					<ListViewItem>Hello!</ListViewItem>
					<ListViewItem disabled>Hello!</ListViewItem>
					<ListViewItem>Hello!</ListViewItem>
				</ListView>

				<ListView selectionMode="multiply" selectedItems={[0]}>
					<ListViewItem disabled>Hello!</ListViewItem>
					<ListViewItem>Hello!</ListViewItem>
					<ListViewItem disabled>Hello!</ListViewItem>
					<ListViewItem>Hello!</ListViewItem>
				</ListView>
			</div>

			<TitleBlock type="title">GridView</TitleBlock>

			<div style={columnStyle}>
				<GridView style={{ width: 350 }}>
					<GridViewItem style={columnStyle}>
						<svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 0.599805L32.3333 8.93314C32.7333 9.19981 33 9.5998 33 10.0665L32.3333 28.6665H1.66667L1 10.0665C1 9.5998 1.26667 9.13314 1.66667 8.93314L16 0.599805C16.6 0.199805 17.4 0.199805 18 0.599805Z" fill="url(#paint0_linear_30333:133698)"/>
							<g filter="url(#filter0_dd_30333:133698)">
								<path d="M29.0013 26H5.0013C4.26797 26 3.66797 25.4 3.66797 24.6667V11.3333C3.66797 10.6 4.26797 10 5.0013 10H29.0013C29.7346 10 30.3346 10.6 30.3346 11.3333V24.6667C30.3346 25.4 29.7346 26 29.0013 26Z" fill="#F2F2F2"/>
							</g>
							<path d="M29.0013 26H5.0013C4.26797 26 3.66797 25.4 3.66797 24.6667V11.3333C3.66797 10.6 4.26797 10 5.0013 10H29.0013C29.7346 10 30.3346 10.6 30.3346 11.3333V24.6667C30.3346 25.4 29.7346 26 29.0013 26Z" fill="#F2F2F2"/>
							<mask id="mask0_30333:133698" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="0" width="32" height="29">
								<path d="M18 0.599805L32.3333 8.93314C32.7333 9.19981 33 9.5998 33 10.0665L32.3333 28.6665H1.66667L1 10.0665C1 9.5998 1.26667 9.13314 1.66667 8.93314L16 0.599805C16.6 0.199805 17.4 0.199805 18 0.599805Z" fill="url(#paint1_linear_30333:133698)"/>
							</mask>
							<g mask="url(#mask0_30333:133698)">
								<g filter="url(#filter1_dd_30333:133698)">
									<path d="M32.5333 29.6667C32.8 29.4 33 29.0667 33 28.6667V10.0667L17 20L23.4 25.7333L32.5333 29.6667Z" fill="url(#paint2_linear_30333:133698)"/>
									<path d="M1 10V28.6667C1 29.4 1.6 30 2.33333 30H31.6667C32 30 32.2667 29.8667 32.5333 29.6667L1 10Z" fill="url(#paint3_linear_30333:133698)"/>
								</g>
							</g>
							<path d="M32.5333 29.6669C32.8 29.4002 33 29.0669 33 28.6669V10.0669L17 20.0002L23.4 25.7336L32.5333 29.6669Z" fill="url(#paint4_linear_30333:133698)"/>
							<path d="M1 10V28.6667C1 29.4 1.6 30 2.33333 30H31.6667C32 30 32.2667 29.8667 32.5333 29.6667L1 10Z" fill="url(#paint5_linear_30333:133698)"/>
							<defs>
								<filter id="filter0_dd_30333:133698" x="0.667969" y="7" width="32.666" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feFlood floodOpacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset/>
									<feGaussianBlur stdDeviation="0.5"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30333:133698"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset/>
									<feGaussianBlur stdDeviation="1.5"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
									<feBlend mode="normal" in2="effect1_dropShadow_30333:133698" result="effect2_dropShadow_30333:133698"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30333:133698" result="shape"/>
								</filter>
								<filter id="filter1_dd_30333:133698" x="-2" y="7" width="38" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feFlood floodOpacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset/>
									<feGaussianBlur stdDeviation="0.5"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30333:133698"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset/>
									<feGaussianBlur stdDeviation="1.5"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
									<feBlend mode="normal" in2="effect1_dropShadow_30333:133698" result="effect2_dropShadow_30333:133698"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30333:133698" result="shape"/>
								</filter>
								<linearGradient id="paint0_linear_30333:133698" x1="25.4816" y1="33.3173" x2="9.2378" y2="5.18221" gradientUnits="userSpaceOnUse">
									<stop offset="0.3116" stopColor="#114A8B"/>
									<stop offset="1" stopColor="#0669BC"/>
								</linearGradient>
								<linearGradient id="paint1_linear_30333:133698" x1="25.4816" y1="33.3173" x2="9.2378" y2="5.18221" gradientUnits="userSpaceOnUse">
									<stop offset="0.3116" stopColor="#114A8B"/>
									<stop offset="1" stopColor="#0669BC"/>
								</linearGradient>
								<linearGradient id="paint2_linear_30333:133698" x1="24.6747" y1="43.0767" x2="8.26147" y2="14.6482" gradientUnits="userSpaceOnUse">
									<stop stopColor="#0078D4"/>
									<stop offset="1" stopColor="#28AFEA"/>
								</linearGradient>
								<linearGradient id="paint3_linear_30333:133698" x1="24.6747" y1="43.0767" x2="8.26147" y2="14.6482" gradientUnits="userSpaceOnUse">
									<stop stopColor="#0078D4"/>
									<stop offset="1" stopColor="#28AFEA"/>
								</linearGradient>
								<linearGradient id="paint4_linear_30333:133698" x1="34.5539" y1="31.5972" x2="26.1911" y2="17.1123" gradientUnits="userSpaceOnUse">
									<stop stopColor="#1490DF"/>
									<stop offset="1" stopColor="#3CCBF4"/>
								</linearGradient>
								<linearGradient id="paint5_linear_30333:133698" x1="24.6747" y1="43.0767" x2="8.26147" y2="14.6482" gradientUnits="userSpaceOnUse">
									<stop stopColor="#0078D4"/>
									<stop offset="1" stopColor="#28AFEA"/>
								</linearGradient>
							</defs>
						</svg>

                        Text
					</GridViewItem>
					<GridViewItem style={columnStyle}>
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z" fill="url(#paint0_linear_30333:134072)"/>
							<mask id="mask0_30333:134072" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="2" width="28" height="28">
								<path d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z" fill="url(#paint1_linear_30333:134072)"/>
							</mask>
							<g mask="url(#mask0_30333:134072)">
								<g filter="url(#filter0_dd_30333:134072)">
									<path d="M14.4004 22.0002C14.4004 20.1335 15.8671 18.6002 17.7337 18.4668C18.3337 16.1335 20.4671 14.3335 23.0671 14.3335C25.0004 14.3335 26.667 15.3335 27.667 16.8002C30.067 16.8002 32.0004 18.8002 32.0004 21.2002C32.0004 22.1335 31.7337 23.0002 31.2004 23.7335C30.4004 24.8668 29.067 25.6002 27.6004 25.6002H18.0004C16.6671 25.6002 15.467 24.8668 14.867 23.7335C14.6004 23.2002 14.4004 22.6002 14.4004 22.0002Z" fill="url(#paint2_linear_30333:134072)"/>
								</g>
							</g>
							<path d="M14.4004 22.0002C14.4004 20.1335 15.8671 18.6002 17.7337 18.4668C18.3337 16.1335 20.4671 14.3335 23.0671 14.3335C25.0004 14.3335 26.667 15.3335 27.667 16.8002C30.067 16.8002 32.0004 18.8002 32.0004 21.2002C32.0004 22.1335 31.7337 23.0002 31.2004 23.7335C30.4004 24.8668 29.067 25.6002 27.6004 25.6002H18.0004C16.6671 25.6002 15.467 24.8668 14.867 23.7335C14.6004 23.2002 14.4004 22.6002 14.4004 22.0002Z" fill="url(#paint3_linear_30333:134072)"/>
							<defs>
								<filter id="filter0_dd_30333:134072" x="11.7337" y="12.3335" width="22.9329" height="16.5999" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feFlood floodOpacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.666667"/>
									<feGaussianBlur stdDeviation="1.33333"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30333:134072"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.666667"/>
									<feGaussianBlur stdDeviation="1.33333"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
									<feBlend mode="normal" in2="effect1_dropShadow_30333:134072" result="effect2_dropShadow_30333:134072"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30333:134072" result="shape"/>
								</filter>
								<linearGradient id="paint0_linear_30333:134072" x1="23.0012" y1="28.1531" x2="8.99887" y2="3.90027" gradientUnits="userSpaceOnUse">
									<stop stopColor="#E25A01"/>
									<stop offset="1" stopColor="#FFD400"/>
								</linearGradient>
								<linearGradient id="paint1_linear_30333:134072" x1="23.0012" y1="28.1531" x2="8.99887" y2="3.90027" gradientUnits="userSpaceOnUse">
									<stop stopColor="#E25A01"/>
									<stop offset="1" stopColor="#FFD400"/>
								</linearGradient>
								<linearGradient id="paint2_linear_30333:134072" x1="26.3321" y1="26.9415" x2="19.6862" y2="15.4304" gradientUnits="userSpaceOnUse">
									<stop stopColor="#CCCCCC"/>
									<stop offset="1" stopColor="white"/>
								</linearGradient>
								<linearGradient id="paint3_linear_30333:134072" x1="26.3321" y1="26.9415" x2="19.6862" y2="15.4304" gradientUnits="userSpaceOnUse">
									<stop stopColor="#CCCCCC"/>
									<stop offset="1" stopColor="white"/>
								</linearGradient>
							</defs>
						</svg>

                        Text
					</GridViewItem>
					<GridViewItem style={columnStyle}>
						<svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 0.666504C17.0667 0.666504 18.8667 1.2665 20.2667 2.2665C22.5333 3.79983 24.1333 4.59984 28.7333 4.6665C29.2666 4.6665 29.7333 5.13317 29.7333 5.6665V12.2665C29.7333 13.3332 29.6 14.3332 29.4667 15.3332H15V0.666504Z" fill="url(#paint0_linear_30333:133451)"/>
							<path d="M0.599461 15.3332C0.400366 14.3332 0.333984 13.2665 0.333984 12.2665V5.6665C0.333984 5.13317 0.732175 4.6665 1.32946 4.6665C5.90865 4.59984 7.50142 3.79983 9.75783 2.2665C11.0851 1.2665 12.9433 0.666504 15.0007 0.666504V15.3332H0.599461Z" fill="url(#paint1_linear_30333:133451)"/>
							<path d="M14.9996 15.333V31.1997C14.7996 31.1997 14.6663 31.133 14.4663 31.0663C6.86627 26.6663 1.86628 21.7997 0.599609 15.333H14.9996Z" fill="url(#paint2_linear_30333:133451)"/>
							<path d="M15 31.1997V15.333H29.4C28.2 21.7997 23.1333 26.6663 15.5333 31.0663C15.3333 31.133 15.2 31.1997 15 31.1997Z" fill="url(#paint3_linear_30333:133451)"/>
							<defs>
								<linearGradient id="paint0_linear_30333:133451" x1="26.7337" y1="17.1622" x2="16.1076" y2="1.33524" gradientUnits="userSpaceOnUse">
									<stop stopColor="#0078D4"/>
									<stop offset="1" stopColor="#1493DF"/>
								</linearGradient>
								<linearGradient id="paint1_linear_30333:133451" x1="12.7322" y1="16.637" x2="4.60582" y2="2.62549" gradientUnits="userSpaceOnUse">
									<stop stopColor="#28AFEA"/>
									<stop offset="1" stopColor="#3CCBF4"/>
								</linearGradient>
								<linearGradient id="paint2_linear_30333:133451" x1="16.0886" y1="30.6515" x2="7.58853" y2="13.8258" gradientUnits="userSpaceOnUse">
									<stop stopColor="#0669BC"/>
									<stop offset="1" stopColor="#0078D4"/>
								</linearGradient>
								<linearGradient id="paint3_linear_30333:133451" x1="24.7133" y1="26.9921" x2="18.8912" y2="16.7461" gradientUnits="userSpaceOnUse">
									<stop stopColor="#114A8B"/>
									<stop offset="1" stopColor="#0C59A4"/>
								</linearGradient>
							</defs>
						</svg>

                        Text
					</GridViewItem>
					<GridViewItem style={columnStyle} disabled>
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_30333:133355)">
								<path d="M7.16236 29.9501L21.6652 26.0641C22.383 25.8717 22.8089 25.134 22.6166 24.4162L17.1443 3.99337C16.952 3.27559 16.2142 2.84964 15.4964 3.04196L0.993604 6.92799C0.27583 7.12031 -0.15013 7.8581 0.042197 8.57587L5.51447 28.9987C5.7068 29.7165 6.44458 30.1424 7.16236 29.9501Z" fill="url(#paint0_linear_30333:133355)"/>
								<mask id="mask0_30333:133355" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-1" y="2" width="24" height="28">
									<path d="M7.16236 29.9501L21.6652 26.0641C22.383 25.8717 22.8089 25.134 22.6166 24.4162L17.1443 3.99337C16.952 3.27559 16.2142 2.84964 15.4964 3.04196L0.993604 6.92799C0.27583 7.12031 -0.15013 7.8581 0.042197 8.57587L5.51447 28.9987C5.7068 29.7165 6.44458 30.1424 7.16236 29.9501Z" fill="url(#paint1_linear_30333:133355)"/>
								</mask>
								<g mask="url(#mask0_30333:133355)">
									<g filter="url(#filter0_dd_30333:133355)">
										<path d="M22.6667 3H8.33333C7.59695 3 7 3.59695 7 4.33333V24.6667C7 25.403 7.59695 26 8.33333 26H22.6667C23.403 26 24 25.403 24 24.6667V4.33333C24 3.59695 23.403 3 22.6667 3Z" fill="url(#paint2_linear_30333:133355)"/>
									</g>
								</g>
								<path d="M22.6667 3H8.33333C7.59695 3 7 3.59695 7 4.33333V24.6667C7 25.403 7.59695 26 8.33333 26H22.6667C23.403 26 24 25.403 24 24.6667V4.33333C24 3.59695 23.403 3 22.6667 3Z" fill="url(#paint3_linear_30333:133355)"/>
								<mask id="mask1_30333:133355" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="7" y="3" width="17" height="23">
									<path d="M22.6667 3H8.33333C7.59695 3 7 3.59695 7 4.33333V24.6667C7 25.403 7.59695 26 8.33333 26H22.6667C23.403 26 24 25.403 24 24.6667V4.33333C24 3.59695 23.403 3 22.6667 3Z" fill="url(#paint4_linear_30333:133355)"/>
								</mask>
								<g mask="url(#mask1_30333:133355)">
									<g filter="url(#filter1_dd_30333:133355)">
										<path d="M31.0056 6.92811L16.5028 3.04209C15.785 2.84976 15.0472 3.27572 14.8549 3.99349L9.38261 24.4163C9.19028 25.1341 9.61624 25.8719 10.334 26.0642L24.8369 29.9502C25.5546 30.1425 26.2924 29.7166 26.4847 28.9988L31.957 8.57599C32.1493 7.85822 31.7234 7.12044 31.0056 6.92811Z" fill="url(#paint5_linear_30333:133355)"/>
									</g>
								</g>
								<path d="M31.0056 6.92811L16.5028 3.04209C15.785 2.84976 15.0472 3.27572 14.8549 3.99349L9.38261 24.4163C9.19028 25.1341 9.61624 25.8719 10.334 26.0642L24.8369 29.9502C25.5546 30.1425 26.2924 29.7166 26.4847 28.9988L31.957 8.57599C32.1493 7.85822 31.7234 7.12044 31.0056 6.92811Z" fill="url(#paint6_linear_30333:133355)"/>
								<path d="M22.2531 10.2802C22.2633 10.2659 22.2776 10.2551 22.2941 10.2492C22.3105 10.2433 22.3284 10.2425 22.3453 10.2471C22.3622 10.2516 22.3774 10.2612 22.3887 10.2746C22.4 10.2879 22.4069 10.3044 22.4086 10.3218C22.6382 11.874 25.7873 15.7678 26.1124 16.5826C26.4641 17.398 26.5304 18.3082 26.3006 19.1659C26.0707 20.0237 25.5582 20.7788 24.846 21.3091C24.5279 21.5447 24.1617 21.707 23.7735 21.7844C23.3854 21.8618 22.9849 21.8523 22.6008 21.7567C22.0812 21.6146 21.6198 21.3116 21.2829 20.8912C20.9309 20.4502 20.6984 19.9261 20.6076 19.3692C20.6024 19.3386 20.5876 19.3105 20.5653 19.2888C20.543 19.2672 20.5144 19.2533 20.4836 19.2491C20.4533 19.2436 20.4219 19.2481 20.3944 19.262C20.3668 19.2759 20.3446 19.2983 20.3309 19.326C20.2706 19.4471 20.2164 19.5711 20.1685 19.6977C20.1193 19.8275 20.0767 19.9597 20.0408 20.0938C19.9099 20.5763 19.8704 21.0791 19.9244 21.5761C19.973 22.0335 20.1118 22.4768 20.3327 22.8802C20.3452 22.9019 20.351 22.9269 20.3491 22.9519C20.3473 22.9769 20.3379 23.0008 20.3223 23.0204C20.3067 23.0402 20.2855 23.055 20.2615 23.0627C20.2375 23.0705 20.2116 23.0709 20.1874 23.0639L18.9966 22.7448L17.8058 22.4257C17.7812 22.4196 17.7591 22.4064 17.7422 22.3876C17.7252 22.3689 17.7142 22.3456 17.7107 22.3206C17.707 22.2958 17.7108 22.2704 17.7217 22.2479C17.7326 22.2253 17.75 22.2065 17.7717 22.194C18.1648 21.955 18.5066 21.6406 18.7774 21.2687C19.0727 20.8653 19.2898 20.4102 19.4177 19.9268C19.4537 19.7927 19.4829 19.6569 19.5052 19.5199C19.527 19.3864 19.5421 19.2519 19.5504 19.1168C19.5524 19.086 19.5444 19.0554 19.5275 19.0296C19.5105 19.0038 19.4857 18.9842 19.4566 18.9738C19.4279 18.9621 19.3961 18.9599 19.366 18.9674C19.3359 18.975 19.309 18.992 19.2892 19.0159C18.9321 19.4528 18.4687 19.7904 17.9433 19.9963C17.4414 20.192 16.8904 20.2237 16.3693 20.0869C15.9889 19.9777 15.6373 19.7857 15.3399 19.5246C15.0424 19.2635 14.8063 18.9398 14.6487 18.5768C14.297 17.7614 14.2308 16.8512 14.4606 15.9935C14.6904 15.1357 15.2029 14.3806 15.9151 13.8503C16.6041 13.3073 21.2782 11.5096 22.2531 10.2802Z" fill="url(#paint7_linear_30333:133355)"/>
								<path d="M16.5419 7.98703C16.5231 7.98176 16.5062 7.97114 16.4932 7.95644C16.4803 7.94174 16.4719 7.92361 16.4691 7.90424C16.4651 7.88141 16.468 7.85789 16.4777 7.8368C16.4873 7.81572 16.5032 7.79808 16.5231 7.78624C16.6266 7.7185 16.7193 7.63574 16.7984 7.54068C16.8801 7.39023 16.945 7.23128 16.9921 7.06668L17.0039 7.01806C16.9291 7.08654 16.8419 7.14005 16.7469 7.17572C16.6189 7.22385 16.479 7.23105 16.3466 7.19632C16.2502 7.16921 16.1609 7.12125 16.085 7.05583C16.0091 6.9904 15.9485 6.90911 15.9075 6.8177C15.8181 6.61749 15.8001 6.39269 15.8563 6.18077C15.9126 5.96884 16.0397 5.7826 16.2166 5.65307C16.3554 5.56861 16.5006 5.49515 16.6508 5.43336C17.0075 5.30915 17.3403 5.12478 17.6348 4.88824C17.6881 4.83378 17.7431 4.78381 17.8119 4.80224C17.8807 4.82067 17.9033 4.89143 17.9222 4.96524C18.059 5.31734 18.2551 5.64342 18.5019 5.92935C18.6011 6.05798 18.6901 6.19418 18.768 6.33671C18.8578 6.5361 18.8751 6.76061 18.8169 6.97141C18.7624 7.18515 18.6335 7.37249 18.4534 7.49987C18.3722 7.55854 18.2791 7.59865 18.1807 7.61737C18.0823 7.63609 17.9809 7.63296 17.8838 7.60821C17.7519 7.57211 17.6343 7.49594 17.5475 7.39021C17.483 7.31184 17.4342 7.22186 17.4037 7.12514L17.3896 7.17314C17.3481 7.3392 17.3249 7.50932 17.3204 7.68045C17.3413 7.80231 17.3803 7.92037 17.436 8.03075C17.4474 8.05097 17.4523 8.07416 17.4501 8.09725C17.4479 8.12033 17.4387 8.1422 17.4238 8.15994C17.4117 8.1753 17.3954 8.18682 17.3768 8.19308C17.3583 8.19934 17.3383 8.20008 17.3194 8.19522L16.5419 7.98703Z" fill="#333333"/>
								<path d="M23.1414 28.0857C23.1226 28.0804 23.1057 28.0698 23.0927 28.0551C23.0798 28.0404 23.0714 28.0222 23.0686 28.0029C23.0645 27.98 23.0675 27.9565 23.0772 27.9354C23.0868 27.9144 23.1027 27.8967 23.1226 27.8849C23.2261 27.8171 23.3188 27.7344 23.3979 27.6393C23.4796 27.4889 23.5445 27.3299 23.5916 27.1653L23.6034 27.1167C23.5286 27.1852 23.4414 27.2387 23.3464 27.2744C23.2183 27.3225 23.0785 27.3297 22.9461 27.295C22.8497 27.2679 22.7603 27.2199 22.6845 27.1545C22.6086 27.089 22.548 27.0077 22.507 26.9163C22.4147 26.716 22.3968 26.4893 22.4565 26.2769C22.5114 26.0653 22.6387 25.8795 22.8161 25.7517C22.9549 25.6672 23.1001 25.5938 23.2503 25.532C23.607 25.4078 23.9398 25.2234 24.2343 24.9869C24.2876 24.9324 24.3426 24.8824 24.4114 24.9009C24.4802 24.9193 24.5028 24.9901 24.5217 25.0639C24.6585 25.416 24.8545 25.742 25.1014 26.028C25.2006 26.1566 25.2896 26.2928 25.3675 26.4353C25.4573 26.6347 25.4746 26.8592 25.4164 27.07C25.3619 27.2838 25.233 27.4711 25.0529 27.5985C24.9717 27.6572 24.8786 27.6973 24.7802 27.716C24.6817 27.7347 24.5804 27.7316 24.4833 27.7068C24.3513 27.6707 24.2338 27.5946 24.147 27.4888C24.0825 27.4105 24.0337 27.3205 24.0032 27.2238L23.9891 27.2718C23.9476 27.4378 23.9243 27.608 23.9199 27.7791C23.9408 27.9009 23.9798 28.019 24.0355 28.1294C24.0468 28.1496 24.0518 28.1728 24.0496 28.1959C24.0474 28.219 24.0382 28.2408 24.0233 28.2586C24.0112 28.2739 23.9949 28.2855 23.9763 28.2917C23.9578 28.298 23.9378 28.2987 23.9188 28.2939L23.1414 28.0857Z" fill="black"/>
							</g>
							<defs>
								<filter id="filter0_dd_30333:133355" x="5" y="1.66667" width="21" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feFlood floodOpacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.333333"/>
									<feGaussianBlur stdDeviation="0.333333"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30333:133355"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.666667"/>
									<feGaussianBlur stdDeviation="1"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
									<feBlend mode="normal" in2="effect1_dropShadow_30333:133355" result="effect2_dropShadow_30333:133355"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30333:133355" result="shape"/>
								</filter>
								<filter id="filter1_dd_30333:133355" x="7.33594" y="1.66276" width="26.668" height="31.0005" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feFlood floodOpacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.333333"/>
									<feGaussianBlur stdDeviation="0.333333"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
									<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30333:133355"/>
									<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
									<feOffset dy="0.666667"/>
									<feGaussianBlur stdDeviation="1"/>
									<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
									<feBlend mode="normal" in2="effect1_dropShadow_30333:133355" result="effect2_dropShadow_30333:133355"/>
									<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30333:133355" result="shape"/>
								</filter>
								<linearGradient id="paint0_linear_30333:133355" x1="18.0581" y1="28.1764" x2="4.55781" y2="4.79321" gradientUnits="userSpaceOnUse">
									<stop stopColor="#243A5E"/>
									<stop offset="1" stopColor="#0C59A4"/>
								</linearGradient>
								<linearGradient id="paint1_linear_30333:133355" x1="18.0581" y1="28.1764" x2="4.55781" y2="4.79321" gradientUnits="userSpaceOnUse">
									<stop stopColor="#243A5E"/>
									<stop offset="1" stopColor="#0C59A4"/>
								</linearGradient>
								<linearGradient id="paint2_linear_30333:133355" x1="22.361" y1="26.3798" x2="8.63947" y2="2.61346" gradientUnits="userSpaceOnUse">
									<stop stopColor="#1B9DE2"/>
									<stop offset="1" stopColor="#35C1F1"/>
								</linearGradient>
								<linearGradient id="paint3_linear_30333:133355" x1="22.361" y1="26.3798" x2="8.63947" y2="2.61346" gradientUnits="userSpaceOnUse">
									<stop stopColor="#1B9DE2"/>
									<stop offset="1" stopColor="#35C1F1"/>
								</linearGradient>
								<linearGradient id="paint4_linear_30333:133355" x1="22.361" y1="26.3798" x2="8.63947" y2="2.61346" gradientUnits="userSpaceOnUse">
									<stop stopColor="#1B9DE2"/>
									<stop offset="1" stopColor="#35C1F1"/>
								</linearGradient>
								<linearGradient id="paint5_linear_30333:133355" x1="26.7003" y1="29.4286" x2="14.6393" y2="3.56367" gradientUnits="userSpaceOnUse">
									<stop stopColor="#CCCCCC"/>
									<stop offset="1" stopColor="white"/>
								</linearGradient>
								<linearGradient id="paint6_linear_30333:133355" x1="26.7003" y1="29.4286" x2="14.6393" y2="3.56367" gradientUnits="userSpaceOnUse">
									<stop stopColor="#CCCCCC"/>
									<stop offset="1" stopColor="white"/>
								</linearGradient>
								<linearGradient id="paint7_linear_30333:133355" x1="21.7374" y1="22.6674" x2="18.6702" y2="11.2202" gradientUnits="userSpaceOnUse">
									<stop/>
									<stop offset="1" stopColor="#4D4D4D"/>
								</linearGradient>
								<clipPath id="clip0_30333:133355">
									<rect width="32" height="32" fill="white"/>
								</clipPath>
							</defs>
						</svg>

                        Text
					</GridViewItem>
				</GridView>
			</div>

			<div style={columnStyle}>
				{/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
				<GridView style={{ width: 350 }} selectedItems={[3]} selectionMode="multiply">
					<GridViewItem style={{ backgroundSize: 'cover', backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/a008/6893/5795e381ee90a27ca0a0ace56a9897b2?Expires=1636329600&Signature=bzkCY9VmAhFePbHk3s3XEFSefnvH3IfgDHYVumgNGWZbPacKcgbqlHkIl~i~IjmyUw8J0ZR-CnEnckmMBNF4hm6FuZsJePaex7mN-bNrQ5zVnmTpBzezWqIwZJ5nYZ7FggsEGvEBvfoUI3E9iMtOfuOKvltn3zwvF4l7gNpMj4AzNQ3zpRbAOIgwtpOQGgdcAoWo1DY4Tw15Ul15qAeHvTOC7nF9wPTfgSufEn2IfHQytEGaGIJt4wxtfLLE~hjAXTBlnw440ZrHQ5zU13s2q1hOI1BHTK~tJwEo6tT3WqsNPn87IWI7r6DhoPAv7ZkDTRhNAQals8pomBVNs6qJaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")' }}/>
					<GridViewItem style={{ backgroundSize: 'cover', backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/d2be/e934/ae7fc73898758b4855813634a7acbbd1?Expires=1636329600&Signature=O8~AewfpSdIiWgrsh3hwzfJet904lksLgNSgRViVk-vEdwmoBigatpyVzb6oQwYXWkI6NVMz7WmUAUURbEim6NfQUeyvNu1w~d2M6tME6RiBDlyKrVthvY5gos6wmxe0aBXYVN-K1qe7uRTO5Lct-p3BAlWyjbS0DrsHRWKI~tzjA-VnmKPA~rT~DLs06RbU3yD2HgDIUFup2eontLjifoa4-kDs2qaYn7deJWox8wzK1Jn-ZjVLWEJdbqDBLa7fm7LGLODzNmUvG0Rt0Z~cCxGH0ubipDW0JQSEp7lCieSIzh2BetDuRVdrs3a2BLPiZa-RgEkiplr8zQHcwxDskA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")' }}/>
					<GridViewItem style={{ backgroundSize: 'cover', backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/83e2/21e9/0389d8542294d58696523798c6e43b76?Expires=1636329600&Signature=dKMr29ubVDSiTjW-7HVseZvwDVAz~0Fkws3jNkK3YaTJOologr3CiQ6P13VsvKZ2LpcVcbcT5TMdL3D7PoDq6n8AJgXQk5GYC-FRjOAlzPtsToRvrCTmYWV4EhT0OLmXt2-XptMW7YSv5Saq3wiOKGNk3qXBlro4h8lbIpJqhXuPYQ5AmHK2pMjEfWLMoAfS7NW5BNCBi-UCQW62gCVCZ9pz9jqkn34dJ2KrCjDm3FOX2RplyQQ2dg7EkIPtpHW-THcpdXwM4NcZkuqtbro-rgSKkBZlRqESYFREiDJXkoICZjFNhnL4sGEzG1mjlPsoibg5ppOVXnY73QUARHytkg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")' }}/>
					<GridViewItem disabled style={{ backgroundSize: 'cover', backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/9984/59dc/b2ab2fcf8a38f56e8e5ba555f7d5afe4?Expires=1636329600&Signature=AccMLM1uisyGiwElGdG9J77N7G8qyZo19lZDClewJkYDqKBRcTzT27ZFRv~1CXUzNCkZK2vnVfeqRfjc5qfmc7-eKP6CqjfzYCTNPvJwzZiAQhnFojmCxQtoi~KJD65q3MwAKIMixmnYOP-1t8c4zJjw0PH82wmr7ZBEb1VZeYGEArWtHt8LXZaSTIfOP8yX~-DI4s9Stlfz45Qy7~RiWFiPZZmduOTiACv5G9rJk4WBL~vE2ocbWZqTY0Y2VQklH4v3MwNsR~cGhgG1aM6o9qSvYV3JbJ3ISOg2KrB9Wej5hTFZEpqxL2wROBBD8veX2F0NdIOBInH77CDH3SyN9Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")' }}/>
				</GridView>
			</div>

			<div style={columnStyle}>
				<TreeView selectionMode="multiply">
					<TreeNode value="parent 1" title="parent 1">
						<TreeNode value="parent 1-0" title="parent 1-0">
							<TreeNode value="leaf1" title="leaf1" />
							<TreeNode value="leaf2" title="leaf2" />
						</TreeNode>
						<TreeNode value="parent 1-1" title="parent 1-1">
							<TreeNode value="leaf3" title="HEllo!" />
						</TreeNode>
					</TreeNode>
				</TreeView>
			</div>
		</div>
	)
}

export default App
