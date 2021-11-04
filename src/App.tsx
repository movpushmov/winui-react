import React, { CSSProperties } from 'react'
import './lib/winui.css'
import { NavigationView } from './lib/Navigation/NavigationView/NavigationView'
import { NavigationViewItem } from './lib/Navigation/NavigationView/NavigationViewItem'
import { IconType } from './lib/Icons/Icon'

function App(): React.ReactElement {
	return (
		<NavigationView>
			<NavigationViewItem title="Basic Input" value="basicInput" icon={IconType.CheckboxComposite}>
				<NavigationViewItem title="Button" value="button"/>
				<NavigationViewItem title="DropdownButton" value="dropDownButton"/>
			</NavigationViewItem>
			<NavigationViewItem title="Collections" value="collections" icon={IconType.GridView}>
				<NavigationViewItem title="GridView" value="gridView"/>
				<NavigationViewItem title="ListView" value="listView"/>
				<NavigationViewItem title="TreeView" value="treeView"/>
			</NavigationViewItem>
			<NavigationViewItem title="Dialogs and Flyouts" value="dialogsAndFlyouts" icon={IconType.Comment}>
				<NavigationViewItem title="ContentDialog" value="contentDialog"/>
				<NavigationViewItem title="Flyout" value="flyout"/>
			</NavigationViewItem>
			<NavigationViewItem title="Navigation" value="navigation" icon={IconType.GlobalNavButton}>
				<NavigationViewItem title="BreadcrumbBar" value="breadcrumbBar"/>
				<NavigationViewItem title="NavigationView" value="navigationView"/>
			</NavigationViewItem>
			<NavigationViewItem title="Status and info" value="statusAndInfo" icon={IconType.ActionCenter}>
				<NavigationViewItem title="InfoBadge" value="infoBadge"/>
				<NavigationViewItem title="InfoBar" value="infoBar"/>
				<NavigationViewItem title="ProgressBar" value="progressBar"/>
				<NavigationViewItem title="ProgressRing" value="progressRing"/>
				<NavigationViewItem title="Tooltip" value="tooltip"/>
			</NavigationViewItem>
			<NavigationViewItem title="Text" value="text" icon={IconType.Font}>
				<NavigationViewItem title="TextBlock" value="textBlock"/>
				<NavigationViewItem title="TitleBlock" value="titleBlock"/>
				<NavigationViewItem title="TextBox" value="textBox"/>
				<NavigationViewItem title="NumberBox" value="numberBox"/>
			</NavigationViewItem>
		</NavigationView>
	)
}

export default App
