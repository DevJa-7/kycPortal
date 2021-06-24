import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import { TEXT_COLOR, BACKGROUND_COLOR } from './styles';

/**
 * Common Props
 */
interface ICommonProps {
	fill?: string;
	width?: number;
	height?: number;
	className?: string;
}
/**
 * Menu Icon
 */
const MenuIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="open-menu"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 21.484 15.106"
			className={className}
		>
			<g data-name="Group 1081" transform="translate(0 6.714)">
				<g id="Group_1080" data-name="Group 1080">
					<path
						id="Path_858"
						d="M20.645 236H.839a.839.839 0 0 0 0 1.678h19.806a.839.839 0 0 0 0-1.678z"
						className="cls-1"
						data-name="Path 858"
						transform="translate(0 -236)"
					/>
				</g>
			</g>
			<g id="Group_1083" data-name="Group 1083">
				<g id="Group_1082" data-name="Group 1082">
					<path
						id="Path_859"
						d="M20.645 76H.839a.839.839 0 1 0 0 1.678h19.806a.839.839 0 1 0 0-1.678z"
						className="cls-1"
						data-name="Path 859"
						transform="translate(0 -76)"
					/>
				</g>
			</g>
			<g id="Group_1085" data-name="Group 1085" transform="translate(0 13.428)">
				<g id="Group_1084" data-name="Group 1084">
					<path
						id="Path_860"
						d="M20.645 396H.839a.839.839 0 1 0 0 1.678h19.806a.839.839 0 1 0 0-1.678z"
						className="cls-1"
						data-name="Path 860"
						transform="translate(0 -396)"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

MenuIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 32.2,
	height: 22.6,
	className: '',
};

/**
 * Subscription Icon
 */
const SubscriptionIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="open-menu"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 28 23.52"
			className={className}
		>
			<g id="subscription" transform="translate(-1 9.24)">
				<g id="Group_1109" data-name="Group 1109" transform="translate(1 -9.24)">
					<path
						id="Path_881"
						d="M27.88 3.8h-5.6V2.68A1.68 1.68 0 0 0 20.6 1H9.4a1.68 1.68 0 0 0-1.68 1.68V3.8h-5.6A1.12 1.12 0 0 0 1 4.92V20.6a1.12 1.12 0 0 0 1.12 1.12h5.6v1.12a1.68 1.68 0 0 0 1.68 1.68h11.2a1.68 1.68 0 0 0 1.68-1.68v-1.12h5.6A1.12 1.12 0 0 0 29 20.6V4.92a1.12 1.12 0 0 0-1.12-1.12zm-5.6 13.44h1.96a.28.28 0 0 1 0 .56h-1.96zm-14.56.56H5.76a.28.28 0 0 1 0-.56h1.96zm-5.6 2.8V4.92h5.6V6.6h-2.8a.56.56 0 0 0 0 1.12h2.8v1.12H6.04a.56.56 0 0 0 0 1.12h1.68v6.16H5.76a1.4 1.4 0 1 0 0 2.8h1.96v1.68zm19.04 2.24a.56.56 0 0 1-.56.56H9.4a.56.56 0 0 1-.56-.56V2.68a.56.56 0 0 1 .56-.56h11.2a.56.56 0 0 1 .56.56zm1.12-2.24v-1.68h1.96a1.4 1.4 0 1 0 0-2.8h-1.96V9.96h1.68a.56.56 0 0 0 0-1.12h-1.68V7.72h2.8a.56.56 0 1 0 0-1.12h-2.8V4.92h5.6V20.6z"
						className="cls-1"
						data-name="Path 881"
						transform="translate(-1 -1)"
					/>

					<path
						id="Path_882"
						d="M26.4 8h-7.84a.56.56 0 1 0 0 1.12h7.84a.56.56 0 1 0 0-1.12z"
						className="cls-1"
						data-name="Path 882"
						transform="translate(-8.48 -4.08)"
					/>
					<path
						id="Path_883"
						d="M25.16 30h-4.48a1.68 1.68 0 0 0 0 3.36h4.48a1.68 1.68 0 0 0 0-3.36zm0 2.24h-4.48a.56.56 0 0 1 0-1.12h4.48a.56.56 0 0 1 0 1.12z"
						className="cls-1"
						data-name="Path 883"
						transform="translate(-8.92 -13.76)"
					/>
					<path
						id="Path_884"
						d="M26.72 12.56a.56.56 0 0 0-.56-.56h-5.6a.56.56 0 1 0 0 1.12h5.6a.56.56 0 0 0 .56-.56z"
						className="cls-1"
						data-name="Path 884"
						transform="translate(-9.36 -5.84)"
					/>
					<path
						id="Path_885"
						d="M25.92 20h-3.36a.56.56 0 1 0 0 1.12h3.36a.56.56 0 1 0 0-1.12z"
						className="cls-1"
						data-name="Path 885"
						transform="translate(-10.24 -9.36)"
					/>
					<path
						id="Path_886"
						d="M25.92 24h-3.36a.56.56 0 1 0 0 1.12h3.36a.56.56 0 0 0 0-1.12z"
						className="cls-1"
						data-name="Path 886"
						transform="translate(-10.24 -11.12)"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

SubscriptionIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 28,
	height: 23.52,
	className: '',
};

/**
 * Computer Icon
 */
const ComputerIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="computer"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 23.202 21.072"
			className={className}
		>
			<g>
				<g id="Group_1058" data-name="Group 1058">
					<path
						id="Path_840"
						d="M22.681 41.627h-1.134a1.238 1.238 0 0 0 .137-.567v-9.221a.34.34 0 0 0-.68 0v9.221a.567.567 0 0 1-.566.566H2.765a.567.567 0 0 1-.566-.566V29.279a.567.567 0 0 1 .566-.566h9.018a.778.778 0 0 0-.043.68H3.217a.34.34 0 0 0-.34.34v7.177a.34.34 0 0 0 .68 0v-6.838h5.582c-.046.185-.1.412-.123.586a.1.1 0 0 1-.049.07l-.568.327a.1.1 0 0 1-.086.007c-.193-.078-.469-.159-.666-.214a.78.78 0 0 0-.884.361l-.307.531a.779.779 0 0 0 .13.947c.146.143.354.34.518.468a.1.1 0 0 1 .036.077v.654a.1.1 0 0 1-.036.077 6.963 6.963 0 0 0-.518.468.779.779 0 0 0-.13.947l.307.531a.78.78 0 0 0 .884.361c.2-.055.473-.136.666-.214a.1.1 0 0 1 .085.007l.568.327a.1.1 0 0 1 .049.07 6.949 6.949 0 0 0 .147.681.78.78 0 0 0 .755.585h.615a.78.78 0 0 0 .755-.585 6.942 6.942 0 0 0 .147-.681.1.1 0 0 1 .049-.07l.568-.327a.1.1 0 0 1 .086-.007c.193.078.469.159.666.214a.781.781 0 0 0 .884-.361l.313-.532a.779.779 0 0 0-.13-.947 6.961 6.961 0 0 0-.518-.468.1.1 0 0 1-.036-.077v-.654a.1.1 0 0 1 .036-.077 6.962 6.962 0 0 0 .518-.468.779.779 0 0 0 .13-.946l-.307-.531a.78.78 0 0 0-.884-.361c-.2.055-.473.136-.666.214a.1.1 0 0 1-.085-.007l-.568-.327a.1.1 0 0 1-.049-.07c-.025-.175-.077-.4-.123-.587h.815a.78.78 0 0 0 .849.306c.2-.055.474-.136.666-.214a.1.1 0 0 1 .085.007l.568.327a.1.1 0 0 1 .049.07 6.961 6.961 0 0 0 .147.681.78.78 0 0 0 .755.585h.615a.78.78 0 0 0 .755-.585 6.927 6.927 0 0 0 .147-.681.1.1 0 0 1 .049-.07l.568-.327a.1.1 0 0 1 .086-.007c.193.078.469.159.666.214a.781.781 0 0 0 .849-.306h.661v10.2H3.558v-1.894a.34.34 0 1 0-.68 0v2.231a.34.34 0 0 0 .34.34h16.766a.34.34 0 0 0 .34-.34V29.732a.34.34 0 0 0-.34-.34h-.613a.778.778 0 0 0-.043-.68h1.109a.567.567 0 0 1 .566.566V30.4a.34.34 0 0 0 .68 0v-1.121a1.248 1.248 0 0 0-1.246-1.246h-1.788a.1.1 0 0 1-.008-.038v-.655a.1.1 0 0 1 .036-.077c.164-.128.372-.325.518-.468a.779.779 0 0 0 .13-.947l-.307-.531a.78.78 0 0 0-.884-.361c-.2.055-.474.136-.666.214a.1.1 0 0 1-.085-.007l-.568-.327a.1.1 0 0 1-.049-.07 6.956 6.956 0 0 0-.147-.681.78.78 0 0 0-.755-.585h-.615a.78.78 0 0 0-.755.585 6.939 6.939 0 0 0-.147.681.1.1 0 0 1-.049.07l-.568.327a.1.1 0 0 1-.085.007c-.193-.078-.469-.159-.667-.214a.78.78 0 0 0-.884.361l-.307.531a.779.779 0 0 0 .13.947c.146.143.354.34.518.468a.1.1 0 0 1 .036.077v.654a.1.1 0 0 1-.008.038h-9.7a1.248 1.248 0 0 0-1.246 1.246v11.783a1.238 1.238 0 0 0 .137.566H.521a.522.522 0 0 0-.521.521v.906a1.52 1.52 0 0 0 1.518 1.518H17.4a.34.34 0 1 0 0-.68H1.518a.839.839 0 0 1-.838-.838v-.748h8.5v.2a.885.885 0 0 0 .884.884h3.081a.885.885 0 0 0 .884-.884v-.2h8.5v.748a.839.839 0 0 1-.838.838h-2.829a.34.34 0 1 0 0 .68h2.822a1.52 1.52 0 0 0 1.516-1.517v-.906a.522.522 0 0 0-.521-.521zm-12.05-11.48a6.147 6.147 0 0 1 .132.606.772.772 0 0 0 .382.564l.568.327a.773.773 0 0 0 .679.048 6.219 6.219 0 0 1 .594-.19.1.1 0 0 1 .114.046l.307.531a.1.1 0 0 1-.017.121 6.159 6.159 0 0 1-.461.417.771.771 0 0 0-.3.613v.654a.771.771 0 0 0 .3.613 6.163 6.163 0 0 1 .461.417.1.1 0 0 1 .017.121l-.307.531a.1.1 0 0 1-.114.046 6.209 6.209 0 0 1-.594-.19.773.773 0 0 0-.679.048l-.568.327a.772.772 0 0 0-.382.564 6.142 6.142 0 0 1-.132.606.1.1 0 0 1-.1.076h-.613a.1.1 0 0 1-.1-.076 6.146 6.146 0 0 1-.132-.606.772.772 0 0 0-.382-.564l-.568-.327a.773.773 0 0 0-.679-.048 6.219 6.219 0 0 1-.594.19.1.1 0 0 1-.114-.046l-.307-.531a.1.1 0 0 1 .017-.121 6.173 6.173 0 0 1 .461-.417.771.771 0 0 0 .3-.613v-.654a.771.771 0 0 0-.3-.613 6.163 6.163 0 0 1-.461-.417.1.1 0 0 1-.017-.121l.307-.531a.1.1 0 0 1 .114-.046 6.211 6.211 0 0 1 .594.19.773.773 0 0 0 .679-.048l.568-.327a.772.772 0 0 0 .383-.564 6.142 6.142 0 0 1 .132-.606.1.1 0 0 1 .1-.076h.618a.1.1 0 0 1 .1.076zm1.76-3.837a.1.1 0 0 1-.017-.121l.307-.531a.1.1 0 0 1 .114-.046 6.191 6.191 0 0 1 .594.19.773.773 0 0 0 .679-.048l.568-.327a.772.772 0 0 0 .383-.564 6.13 6.13 0 0 1 .132-.606.1.1 0 0 1 .1-.076h.615a.1.1 0 0 1 .1.076 6.135 6.135 0 0 1 .132.606.772.772 0 0 0 .382.564l.568.327a.773.773 0 0 0 .679.048 6.213 6.213 0 0 1 .594-.19.1.1 0 0 1 .114.046l.307.531a.1.1 0 0 1-.017.121 6.17 6.17 0 0 1-.46.417.771.771 0 0 0-.3.613v.654a.771.771 0 0 0 .3.613 6.154 6.154 0 0 1 .461.417.1.1 0 0 1 .017.121l-.307.531a.1.1 0 0 1-.114.046 6.212 6.212 0 0 1-.594-.19.773.773 0 0 0-.679.048l-.568.327a.772.772 0 0 0-.382.564 6.143 6.143 0 0 1-.132.606.1.1 0 0 1-.1.076h-.615a.1.1 0 0 1-.1-.076 6.147 6.147 0 0 1-.132-.606.772.772 0 0 0-.382-.564l-.568-.327a.773.773 0 0 0-.679-.048 6.212 6.212 0 0 1-.594.19.1.1 0 0 1-.114-.046l-.06-.1-.006-.01-.241-.416a.1.1 0 0 1 .017-.121 6.18 6.18 0 0 1 .461-.417.771.771 0 0 0 .3-.613v-.659a.771.771 0 0 0-.3-.613 6.16 6.16 0 0 1-.461-.417zm.955 16.2a.2.2 0 0 1-.2.2H10.06a.2.2 0 0 1-.2-.2v-.2h3.489z"
						className="cls-1"
						data-name="Path 840"
						transform="translate(0 -23.501)"
					/>
					<path
						id="Path_841"
						d="M304.2 78.3a1.851 1.851 0 1 0-1.854-1.851A1.855 1.855 0 0 0 304.2 78.3zm-.53-.806h1.059a1.174 1.174 0 0 1-1.059 0zm.53-2.216a1.174 1.174 0 0 1 1.175 1.171 1.162 1.162 0 0 1-.059.365h-2.232a1.17 1.17 0 0 1 1.116-1.536z"
						className="cls-1"
						data-name="Path 841"
						transform="translate(-288.642 -72.287)"
					/>
					<path
						id="Path_842"
						d="M184.73 206.454a1.855 1.855 0 1 0 1.854-1.851 1.855 1.855 0 0 0-1.854 1.851zm3.029 0a1.175 1.175 0 1 1-1.175-1.171 1.174 1.174 0 0 1 1.175 1.171z"
						className="cls-1"
						data-name="Path 842"
						transform="translate(-176.359 -196.396)"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

ComputerIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 23.202,
	height: 21.072,
	className: '',
};

/**
 * Group Icon
 */
const GroupIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="group"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 26.022 16.632"
			className={className}
		>
			<g transform="translate(.15 -92.1)">
				<g id="Group_1057" data-name="Group 1057" transform="translate(0 92.25)">
					<path
						id="Path_839"
						stroke="#707070"
						strokeWidth="0.3px"
						d="M22.246 99.436a2.937 2.937 0 1 0-3.369 0 5.088 5.088 0 0 0-1.735 1.018 6.584 6.584 0 0 0-2.382-1.3 3.72 3.72 0 1 0-3.848 0 6.639 6.639 0 0 0-2.356 1.283 5.129 5.129 0 0 0-1.715-1 2.937 2.937 0 1 0-3.369 0A5.155 5.155 0 0 0 0 104.312v.336a.022.022 0 0 0 .02.02h6.225a6.845 6.845 0 0 0-.056.86v.346a2.706 2.706 0 0 0 2.711 2.708h7.889a2.706 2.706 0 0 0 2.708-2.708v-.346a6.844 6.844 0 0 0-.056-.86H25.7a.022.022 0 0 0 .02-.02v-.336a5.174 5.174 0 0 0-3.474-4.876zm-3.807-2.407a2.122 2.122 0 1 1 2.161 2.122h-.08a2.119 2.119 0 0 1-2.081-2.122zm-8.52-1.059a2.906 2.906 0 1 1 3.074 2.9h-.336a2.91 2.91 0 0 1-2.738-2.9zm-6.9 1.059a2.122 2.122 0 1 1 2.163 2.122H5.1a2.123 2.123 0 0 1-2.082-2.122zm3.369 6.82H.824a4.348 4.348 0 0 1 4.286-3.884h.061A4.3 4.3 0 0 1 7.944 101a6.682 6.682 0 0 0-1.557 2.849zm12.281 2.026a1.9 1.9 0 0 1-1.893 1.893h-7.89a1.9 1.9 0 0 1-1.893-1.893v-.346a5.846 5.846 0 0 1 5.664-5.838c.056.005.117.005.173.005s.117 0 .173-.005a5.846 5.846 0 0 1 5.664 5.838zm.606-2.026a6.665 6.665 0 0 0-1.542-2.83 4.324 4.324 0 0 1 2.8-1.054h.061a4.348 4.348 0 0 1 4.285 3.883z"
						data-name="Path 839"
						transform="translate(0 -92.25)"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

GroupIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 26.022,
	height: 16.632,
	className: '',
};

/**
 * List Icon
 */
const ListIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="list"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 22.468 19.473"
			className={className}
		>
			<g>
				<g id="Group_1060" data-name="Group 1060" transform="translate(0 2.996)">
					<g id="Group_1059" data-name="Group 1059">
						<path
							id="Path_843"
							d="M8.786 100.886L4.7 96.8a2.717 2.717 0 0 0-1.937-.8h-.038A2.728 2.728 0 0 0 0 98.724v.047a2.707 2.707 0 0 0 .8 1.929l3.056 3.057a.374.374 0 0 0 .53-.53l-3.056-3.056a1.963 1.963 0 0 1-.579-1.4v-.047a1.977 1.977 0 0 1 1.975-1.975h.037a1.973 1.973 0 0 1 1.405.579l4.09 4.089a1.214 1.214 0 0 1-1.7 1.737l-.019-.019-3.42-3.423a.42.42 0 0 1 .594-.594l2.387 2.389a.374.374 0 0 0 .53-.529l-2.388-2.389a1.169 1.169 0 0 0-1.653 1.653l3.421 3.421a1.963 1.963 0 0 0 2.776-2.776z"
							className="cls-1"
							data-name="Path 843"
							transform="translate(0 -95.999)"
						/>
					</g>
				</g>
				<g id="Group_1062" data-name="Group 1062">
					<g id="Group_1061" data-name="Group 1061">
						<path
							id="Path_844"
							d="M22.094 41.362h-2.622v-7.115A2.247 2.247 0 0 0 17.226 32H5.992a2.293 2.293 0 0 0-2.247 2.273.374.374 0 0 0 .749 0 1.486 1.486 0 0 1 .439-1.059 1.5 1.5 0 0 1 1.059-.465h9.563a2.228 2.228 0 0 0-.576 1.5v14.977a1.488 1.488 0 0 1-.439 1.059 1.535 1.535 0 0 1-2.118 0 1.486 1.486 0 0 1-.439-1.059V48.1a.374.374 0 0 0-.374-.374H4.494v-3.37a.374.374 0 0 0-.749 0v3.37H.374A.374.374 0 0 0 0 48.1v1.123a2.247 2.247 0 0 0 2.247 2.247h11.234a2.247 2.247 0 0 0 2.247-2.247v-4.491H20.6a1.872 1.872 0 0 0 1.872-1.872v-1.124a.374.374 0 0 0-.378-.374zM2.247 50.724a1.5 1.5 0 0 1-1.5-1.5v-.749h10.487v.749a2.228 2.228 0 0 0 .576 1.5zm13.481-6.74v-9.737a1.488 1.488 0 0 1 .439-1.059 1.535 1.535 0 0 1 2.118 0 1.486 1.486 0 0 1 .439 1.059v8.613a1.852 1.852 0 0 0 .384 1.123zm5.992-1.123a1.119 1.119 0 0 1-.329.795 1.151 1.151 0 0 1-1.589 0 1.117 1.117 0 0 1-.329-.795v-.749h2.247v.749z"
							className="cls-1"
							data-name="Path 844"
							transform="translate(0 -32)"
						/>
					</g>
				</g>
				<g id="Group_1064" data-name="Group 1064" transform="translate(5.992 2.996)">
					<g id="Group_1063" data-name="Group 1063">
						<path
							id="Path_845"
							d="M135.115 96h-6.74a.374.374 0 0 0 0 .749h6.74a.374.374 0 1 0 0-.749z"
							className="cls-1"
							data-name="Path 845"
							transform="translate(-128 -96)"
						/>
					</g>
				</g>
				<g id="Group_1066" data-name="Group 1066" transform="translate(7.489 4.868)">
					<g id="Group_1065" data-name="Group 1065">
						<path
							id="Path_846"
							d="M165.617 136h-5.243a.374.374 0 1 0 0 .749h5.243a.374.374 0 0 0 0-.749z"
							className="cls-1"
							data-name="Path 846"
							transform="translate(-160 -136)"
						/>
					</g>
				</g>
				<g id="Group_1068" data-name="Group 1068" transform="translate(9.362 6.74)">
					<g id="Group_1067" data-name="Group 1067">
						<path
							id="Path_847"
							d="M203.745 176h-3.37a.374.374 0 1 0 0 .749h3.37a.374.374 0 1 0 0-.749z"
							className="cls-1"
							data-name="Path 847"
							transform="translate(-200 -176)"
						/>
					</g>
				</g>
				<g id="Group_1070" data-name="Group 1070" transform="translate(10.111 8.613)">
					<g id="Group_1069" data-name="Group 1069">
						<path
							id="Path_848"
							d="M219 216h-2.621a.374.374 0 1 0 0 .749H219a.374.374 0 1 0 0-.749z"
							className="cls-1"
							data-name="Path 848"
							transform="translate(-216 -216)"
						/>
					</g>
				</g>
				<g id="Group_1072" data-name="Group 1072" transform="translate(9.736 10.485)">
					<g id="Group_1071" data-name="Group 1071">
						<path
							id="Path_849"
							d="M211.37 256h-3a.374.374 0 1 0 0 .749h3a.374.374 0 0 0 0-.749z"
							className="cls-1"
							data-name="Path 849"
							transform="translate(-208 -256)"
						/>
					</g>
				</g>
				<g id="Group_1074" data-name="Group 1074" transform="translate(5.992 12.358)">
					<g id="Group_1073" data-name="Group 1073">
						<path
							id="Path_850"
							d="M135.115 296h-6.74a.374.374 0 0 0 0 .749h6.74a.374.374 0 0 0 0-.749z"
							className="cls-1"
							data-name="Path 850"
							transform="translate(-128 -296)"
						/>
					</g>
				</g>
				<g id="Group_1076" data-name="Group 1076" transform="translate(5.992 14.23)">
					<g id="Group_1075" data-name="Group 1075">
						<path
							id="Path_851"
							d="M135.115 336h-6.74a.374.374 0 0 0 0 .749h6.74a.374.374 0 1 0 0-.749z"
							className="cls-1"
							data-name="Path 851"
							transform="translate(-128 -336)"
						/>
					</g>
				</g>
			</g>
		</SvgIcon>
	);
};

ListIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 22.468,
	height: 19.473,
	className: '',
};

/**
 * Verified Icon
 */
const VerifiedIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="open-menu"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 26 26"
			className={className}
		>
			<path id="Path_145" fill="none" d="M0 0h26v26H0z" data-name="Path 145" />
			<path
				id="Path_146"
				d="M15.75 2L6 6.333v6.5c0 6.018 4.155 11.63 9.75 13 5.6-1.37 9.75-6.982 9.75-13v-6.5zm-2.167 17.333L9.25 15l1.533-1.533 2.8 2.8 7.134-7.134 1.533 1.533z"
				data-name="Path 146"
				transform="translate(-2.75 -.917)"
			/>
		</SvgIcon>
	);
};

VerifiedIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 26,
	height: 26,
	className: '',
};

/**
 * User Icon
 */
const UserIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="user"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 17.304 21.457"
			className={className}
		>
			<g transform="translate(3.877 .15)">
				<path
					id="Path_6"
					d="M91.4 10.561a5.28 5.28 0 1 0-5.28-5.28 5.28 5.28 0 0 0 5.28 5.28zm0-9.666a4.385 4.385 0 1 1-4.384 4.385A4.385 4.385 0 0 1 91.4.895zm0 0"
					className="cls-1"
					data-name="Path 6"
					transform="translate(-86.626)"
				/>
				<path
					id="Path_7"
					d="M4.775 331.313a8.334 8.334 0 0 0-6.014 2.51 8.944 8.944 0 0 0-2.488 6.319.449.449 0 0 0 .448.447H12.83a.449.449 0 0 0 .447-.447 8.934 8.934 0 0 0-2.488-6.314 8.339 8.339 0 0 0-6.014-2.515zm-7.6 8.381a7.992 7.992 0 0 1 2.22-5.24 7.456 7.456 0 0 1 5.374-2.242 7.455 7.455 0 0 1 5.374 2.242 7.97 7.97 0 0 1 2.22 5.24zm0 0"
					className="cls-1"
					data-name="Path 7"
					transform="translate(0 -319.432)"
				/>
			</g>
		</SvgIcon>
	);
};

UserIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 17.304,
	height: 21.457,
	className: '',
};

/**
 * Logout Icon
 */
const LogOutIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="open-menu"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 21.8 21.728"
			className={className}
		>
			<g id="logout" transform="translate(0 -.85)">
				<g id="Group_150" data-name="Group 150" transform="translate(0 .85)">
					<g id="Group_149" data-name="Group 149">
						<path
							id="Path_164"
							d="M10.864 20.767H2.716a.906.906 0 0 1-.905-.905V3.566a.906.906 0 0 1 .905-.905h8.148a.905.905 0 0 0 0-1.811H2.716A2.719 2.719 0 0 0 0 3.566v16.3a2.719 2.719 0 0 0 2.716 2.716h8.148a.905.905 0 1 0 0-1.811z"
							className="cls-1"
							data-name="Path 164"
							transform="translate(0 -.85)"
						/>
					</g>
				</g>
				<g id="Group_152" data-name="Group 152" transform="translate(7.243 5.377)">
					<g id="Group_151" data-name="Group 151">
						<path
							id="Path_165"
							d="M184.388 112.857l-5.5-5.432a.905.905 0 0 0-1.271 1.289l3.934 3.882h-10.546a.905.905 0 0 0 0 1.811h10.541l-3.934 3.882a.905.905 0 1 0 1.271 1.289l5.5-5.432a.9.9 0 0 0 0-1.289z"
							className="cls-1"
							data-name="Path 165"
							transform="translate(-170.1 -107.165)"
						/>
					</g>
				</g>
			</g>
		</SvgIcon>
	);
};

LogOutIcon.defaultProps = {
	fill: TEXT_COLOR.placeholder,
	width: 21.8,
	height: 21.728,
	className: '',
};

/**
 * Contact Icon
 */
const ContactIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="contact"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 85.6 57.462"
			className={className}
		>
			<path
				id="Path_903"
				d="M78.2 0H7.4A7.407 7.407 0 0 0 0 7.4v42.663a7.407 7.407 0 0 0 7.4 7.4h70.8a7.407 7.407 0 0 0 7.4-7.4V7.4A7.407 7.407 0 0 0 78.2 0zm4.856 50.063A4.862 4.862 0 0 1 78.2 54.92H7.4a4.862 4.862 0 0 1-4.856-4.856V7.4A4.862 4.862 0 0 1 7.4 2.542h70.8A4.862 4.862 0 0 1 83.057 7.4zm0 0"
				className="cls-1"
				data-name="Path 903"
			/>
			<path
				id="Path_904"
				d="M74.363 60.832H44.869A1.271 1.271 0 0 0 43.6 62.1v3.051a1.272 1.272 0 0 0 2.543 0v-1.78h26.949v31.02H46.141V70.239a1.272 1.272 0 1 0-2.543 0v25.426a1.272 1.272 0 0 0 1.272 1.272h29.493a1.272 1.272 0 0 0 1.272-1.272V62.1a1.271 1.271 0 0 0-1.272-1.272zm0 0"
				className="cls-1"
				data-name="Path 904"
				transform="translate(-36.309 -50.661)"
			/>
			<path
				id="Path_905"
				d="M297.76 78.465h-31.867a1.271 1.271 0 1 0 0 2.542h31.867a1.271 1.271 0 0 0 0-2.542zm0 0"
				className="cls-1"
				data-name="Path 905"
				transform="translate(-220.38 -65.347)"
			/>
			<path
				id="Path_906"
				d="M421.038 133.625h-7.119a1.271 1.271 0 0 0 0 2.542h7.119a1.271 1.271 0 0 0 0-2.542zm0 0"
				className="cls-1"
				data-name="Path 906"
				transform="translate(-343.659 -111.285)"
			/>
			<path
				id="Path_907"
				d="M265.893 136.167h19.662a1.271 1.271 0 1 0 0-2.542h-19.662a1.271 1.271 0 1 0 0 2.542zm0 0"
				className="cls-1"
				data-name="Path 907"
				transform="translate(-220.38 -111.285)"
			/>
			<path
				id="Path_908"
				d="M297.76 188.785h-31.867a1.271 1.271 0 1 0 0 2.542h31.867a1.271 1.271 0 0 0 0-2.542zm0 0"
				className="cls-1"
				data-name="Path 908"
				transform="translate(-220.38 -157.223)"
			/>
			<path
				id="Path_909"
				d="M283.183 243.945h-17.29a1.271 1.271 0 1 0 0 2.542h17.289a1.271 1.271 0 0 0 0-2.542zm0 0"
				className="cls-1"
				data-name="Path 909"
				transform="translate(-220.38 -203.161)"
			/>
			<path
				id="Path_910"
				d="M86.18 124.526a1.272 1.272 0 0 0 2.543 0 6.356 6.356 0 0 1 12.713 0 1.271 1.271 0 0 0 2.542 0 8.9 8.9 0 0 0-4.321-7.628 8.9 8.9 0 1 0-9.156 0 8.9 8.9 0 0 0-4.321 7.628zm2.543-15.256a6.356 6.356 0 1 1 6.356 6.356 6.363 6.363 0 0 1-6.356-6.356zm0 0"
				className="cls-1"
				data-name="Path 910"
				transform="translate(-71.771 -83.591)"
			/>
		</SvgIcon>
	);
};

ContactIcon.defaultProps = {
	fill: BACKGROUND_COLOR.primary,
	width: 85.6,
	height: 57.462,
	className: '',
};

/**
 * Passport Icon
 */
const PassportIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="passport"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 44.219 69.685"
			className={className}
		>
			<g transform="translate(-99.9 -10)">
				<path
					id="Path_911"
					d="M140.847 19.8h-3.81v-8.95a.852.852 0 0 0-.85-.85 1.248 1.248 0 0 0-.241.028L103 19.8a3.278 3.278 0 0 0-3.1 3.272v53.34a3.273 3.273 0 0 0 3.272 3.272h37.675a3.273 3.273 0 0 0 3.272-3.272V23.073a3.273 3.273 0 0 0-3.272-3.273zm-5.51-7.818v7.8h-26.344zm7.082 64.43a1.578 1.578 0 0 1-1.572 1.572h-37.675a1.578 1.578 0 0 1-1.572-1.572V23.073a1.57 1.57 0 0 1 .779-1.36l.014.042.864-.255h37.59a1.578 1.578 0 0 1 1.572 1.572z"
					className="cls-1"
					data-name="Path 911"
				/>
				<path
					id="Path_912"
					d="M188.853 377.7h-24.5a.85.85 0 0 0 0 1.7h24.5a.85.85 0 1 0 0-1.7z"
					className="cls-1"
					data-name="Path 912"
					transform="translate(-54.592 -315.621)"
				/>
				<path
					id="Path_913"
					d="M222.539 418H211.35a.85.85 0 0 0 0 1.7h11.189a.85.85 0 0 0 0-1.7z"
					className="cls-1"
					data-name="Path 913"
					transform="translate(-94.935 -350.213)"
				/>
				<path
					id="Path_914"
					d="M178.49 153.6a12.79 12.79 0 1 0 12.79 12.79 12.794 12.794 0 0 0-12.79-12.79zm-3.881 2.408a12.476 12.476 0 0 0-2.479 3.739 10.905 10.905 0 0 1-1.459-1.218 11.032 11.032 0 0 1 3.938-2.521zm-5.042 3.81a13.136 13.136 0 0 0 1.969 1.572 17.171 17.171 0 0 0-.68 4.15h-3.413a11 11 0 0 1 2.125-5.722zm-2.125 7.408h3.413a17.171 17.171 0 0 0 .68 4.15 12.3 12.3 0 0 0-1.969 1.572 11.041 11.041 0 0 1-2.124-5.723zm3.243 7.011a10.905 10.905 0 0 1 1.459-1.218 12.476 12.476 0 0 0 2.479 3.739 10.978 10.978 0 0 1-3.937-2.522zm6.954 2.8a10.241 10.241 0 0 1-4.022-4.9 10.84 10.84 0 0 1 4.022-1.091zm0-7.691a12.769 12.769 0 0 0-4.575 1.176 16.172 16.172 0 0 1-.51-3.3h5.085zm0-3.824h-5.085a16.172 16.172 0 0 1 .51-3.3 12.555 12.555 0 0 0 4.575 1.176zm0-3.824a11.04 11.04 0 0 1-4.022-1.091 10.365 10.365 0 0 1 4.022-4.886zm8.668-3.173a9.933 9.933 0 0 1-1.459 1.218 12.541 12.541 0 0 0-2.479-3.753 11.469 11.469 0 0 1 3.939 2.539zm-6.968-2.8a10.415 10.415 0 0 1 4.037 4.9 10.837 10.837 0 0 1-4.037 1.091zm0 7.691a12.627 12.627 0 0 0 4.589-1.176 16.189 16.189 0 0 1 .51 3.286h-5.1zm0 3.81h5.085a15.258 15.258 0 0 1-.51 3.286 12.627 12.627 0 0 0-4.589-1.176v-2.11zm0 9.815v-5.991a10.837 10.837 0 0 1 4.037 1.091 10.347 10.347 0 0 1-4.036 4.9zm3.031-.283a12.542 12.542 0 0 0 2.479-3.758 12.085 12.085 0 0 1 1.459 1.218 11.068 11.068 0 0 1-3.937 2.539zm5.042-3.81a11.7 11.7 0 0 0-1.969-1.572 17.057 17.057 0 0 0 .68-4.136h3.413a11.039 11.039 0 0 1-2.123 5.707zm-1.289-7.422a17.057 17.057 0 0 0-.68-4.136 13.136 13.136 0 0 0 1.969-1.572 10.994 10.994 0 0 1 2.125 5.708z"
					className="cls-1"
					data-name="Path 914"
					transform="translate(-56.48 -123.261)"
				/>
			</g>
		</SvgIcon>
	);
};

PassportIcon.defaultProps = {
	fill: BACKGROUND_COLOR.primary,
	width: 44.219,
	height: 69.685,
	className: '',
};

/**
 * Medicare Icon
 */
const medicareStyles = makeStyles(() => ({
	cls1: {
		fill: '#f6e3fd',
	},
	cls2: {
		fill: 'none',
		stroke: (props: { fill: string }) => props.fill,
		strokeWidth: '1.5px',
	},
	cls3: {
		fill: 'none',
		stroke: (props: { fill: string }) => props.fill,
		strokeWidth: '1.5px',
		strokeLinecap: 'round',
	},
}));

const MedicareIcon = ({ fill, width, height, className }: ICommonProps) => {
	const classes = medicareStyles({ fill: fill || '' });
	return (
		<SvgIcon
			id="medicare_small"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 5 85.308 63.643"
			className={className}
		>
			<g transform="rotate(1, 10, 40)">
				<path
					id="Path_87"
					d="M0 26.126S1.081 13.421 9.524 7.088 34.294 0 34.294 0L6.277.051A5.99 5.99 0 0 0 .055 6.665z"
					className={classes.cls1}
					data-name="Path 87"
					transform="rotate(179 41.794 30.88)"
				/>
				<path
					id="Path_126"
					d="M.59 23.821c18.738-.894 62.036-12.051 80.7-15.5-.927-11.476-8.8-7.8-10.8-7.611-4.729.732-10.314 2-10.489 2.032-1.663.338-35.658 6.881-52.025 10.118C-3.144 13.876.618 22.079.59 23.821z"
					className={classes.cls1}
					data-name="Path 126"
					transform="matrix(.985 .174 -.174 .985 4.851 0)"
				/>
				<g
					id="Rectangle_1484"
					className={classes.cls2}
					data-name="Rectangle 1484"
					transform="rotate(-1 744.196 6.494)"
				>
					<rect width="84.436" height="50.662" rx="6" />
					<rect width="82.936" height="49.162" x=".75" y=".75" fill="none" rx="5.25" />
				</g>
				<path
					id="Line_10"
					d="M0 0L31.453 0"
					className={classes.cls3}
					data-name="Line 10"
					transform="rotate(-1 2353.106 -396.37)"
				/>
				<path
					id="Line_11"
					d="M0 4.543L23.294 0"
					className={classes.cls3}
					data-name="Line 11"
					transform="rotate(10.02 -247.6 68.816)"
				/>
				<path
					id="Line_12"
					d="M0 4.403L21.844 0"
					className={classes.cls3}
					data-name="Line 12"
					transform="rotate(10.02 -291.662 73.299)"
				/>
				<path
					id="Line_28"
					d="M0 0L31.453 0"
					className={classes.cls3}
					data-name="Line 28"
					transform="rotate(-1 2752.503 -2684.087)"
				/>
				<path
					id="Line_29"
					d="M0 4.403L21.844 0"
					className={classes.cls3}
					data-name="Line 29"
					transform="rotate(10.02 -260.445 299.24)"
				/>
				<path
					id="Path_127"
					d="M0 15.893L82.562 0"
					className={classes.cls2}
					data-name="Path 127"
					transform="rotate(10.02 -47.01 22.316)"
				/>
			</g>
		</SvgIcon>
	);
};

MedicareIcon.defaultProps = {
	fill: BACKGROUND_COLOR.primary,
	width: 85.308,
	height: 63.643,
	className: '',
};

/**
 * ProofOfAge Icon
 */
const proofOfAgeStyles = makeStyles(() => ({
	cls2: {
		fill: 'none',
		stroke: (props: { fill: string }) => props.fill,
		strokeWidth: '1.5px',
	},
	cls4: {
		fill: 'none',
		stroke: (props: { fill: string }) => props.fill,
		strokeWidth: '1.5px',
		strokeLinecap: 'round',
	},
}));
const ProofOfAgeIcon = ({ fill, width, height, className }: ICommonProps) => {
	const classes = proofOfAgeStyles({ fill: fill || '' });
	return (
		<SvgIcon
			id="proof_of_age_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 85.291 51.175"
			className={className}
		>
			<path
				id="Path_88"
				d="M0 0s1.319 13.264 9.848 19.66 25.078 7.2 25.078 7.2H6.721c-3.533 0-6.587-3.465-6.587-7z"
				data-name="Path 88"
				transform="translate(1.362 22.834)"
			/>
			<g id="Rectangle_1485" className={classes.cls2} data-name="Rectangle 1485">
				<rect width="85.291" height="51.175" rx="6" />
				<rect width="83.791" height="49.675" x=".75" y=".75" fill="none" rx="5.25" />
			</g>
			<g id="age" transform="translate(10.013 15.375)">
				<path
					id="Path_78"
					d="M11.506 24.674a.356.356 0 0 1-.239-.452c.456-1.482.4-2.473-.169-3.029a2.529 2.529 0 0 0-2.221-.3 4.708 4.708 0 0 1-2.729.918 4.708 4.708 0 0 1-2.73-.918 2.505 2.505 0 0 0-2.22.3c-.57.556-.625 1.547-.169 3.029a.362.362 0 1 1-.691.213c-.544-1.766-.428-3 .355-3.76a2.5 2.5 0 0 1 1.8-.635 5.346 5.346 0 0 1-1.1-2.127A1.338 1.338 0 0 1 0 16.471v-.942a.965.965 0 0 1 1.206-.929v-.181a4.928 4.928 0 0 1 .3-1.7.362.362 0 1 1 .679.248 4.206 4.206 0 0 0-.255 1.449v2.056a4.486 4.486 0 0 0 4.219 4.617 4.486 4.486 0 0 0 4.219-4.617v-2.057A4.219 4.219 0 0 0 2.9 11.722a.362.362 0 0 1-.557-.462 4.939 4.939 0 0 1 6.646-.889 5.62 5.62 0 0 1-.133-.908 1.228 1.228 0 0 1-1.214-1.325V7.089a.965.965 0 0 1 1.2-.935V5.3a5.3 5.3 0 0 1 9.388-3.385.362.362 0 0 1-.557.462A4.581 4.581 0 0 0 9.568 5.3v3.822a4.886 4.886 0 0 0 4.581 4.923 4.886 4.886 0 0 0 4.581-4.923V5.3a4.568 4.568 0 0 0-.277-1.573.362.362 0 1 1 .679-.248 5.288 5.288 0 0 1 .321 1.821v.849a.965.965 0 0 1 1.2.935v1.05a1.228 1.228 0 0 1-1.213 1.325 5.911 5.911 0 0 1-1.531 3.57 5.778 5.778 0 0 1-.631.6c.046 1 .532 1.605 2.656 2.06a4.494 4.494 0 0 1 1.9.833.362.362 0 0 1-.434.578 3.752 3.752 0 0 0-2.288-.762 3.811 3.811 0 1 0 3.372 2.031l-3.441 3.441a.362.362 0 0 1-.511 0l-2-2a.362.362 0 0 1 .511-.511l1.743 1.743 4.245-4.242a.362.362 0 0 1 .511.511l-.528.528a4.537 4.537 0 1 1-5.114-2.06 2.98 2.98 0 0 1-.553-.371 2.177 2.177 0 0 1-.741-1.314 4.858 4.858 0 0 1-2.458.674 4.951 4.951 0 0 1-3.118-1.128 4.954 4.954 0 0 1 .061.775v.185a.965.965 0 0 1 1.206.934v.942a1.338 1.338 0 0 1-1.388 1.441 5.346 5.346 0 0 1-1.1 2.127 2.5 2.5 0 0 1 1.8.635c.782.764.9 1.993.355 3.76a.369.369 0 0 1-.452.239zM.965 15.288a.241.241 0 0 0-.241.241v.942c0 .363.1.606.523.694a5.815 5.815 0 0 1-.041-.694v-.942a.241.241 0 0 0-.241-.241zm10.127.241v.942a5.815 5.815 0 0 1-.041.694c.427-.088.523-.331.523-.694v-.942a.241.241 0 0 0-.482 0zm8.362-8.481v1.683a.5.5 0 0 0 .479-.593V7.089a.241.241 0 0 0-.479-.041zm-10.846-.2a.241.241 0 0 0-.241.241v1.05a.5.5 0 0 0 .479.593V7.048a.241.241 0 0 0-.239-.201zm-2.46 13.216a1.746 1.746 0 0 1-1.626-.864.362.362 0 1 1 .65-.318 1.06 1.06 0 0 0 .976.455 1.06 1.06 0 0 0 .976-.455.362.362 0 1 1 .65.318 1.746 1.746 0 0 1-1.626.864zm1.664-2.711a.362.362 0 0 1-.362-.362v-1.026a.362.362 0 0 1 .723 0v1.026a.362.362 0 0 1-.361.361zm-3.327 0a.362.362 0 0 1-.362-.362v-1.026a.362.362 0 0 1 .723 0v1.026a.362.362 0 0 1-.361.361zm4.4-2.6a1.094 1.094 0 0 0-1.412-.053.362.362 0 0 1-.5-.522 1.809 1.809 0 0 1 2.415.048.361.361 0 0 1 .011.511.367.367 0 0 1-.512.011zM2.9 14.737a.361.361 0 0 1 .011-.511 1.809 1.809 0 0 1 2.415-.048.362.362 0 0 1-.5.522 1.094 1.094 0 0 0-1.414.048.367.367 0 0 1-.512-.011zm11.251-2.278a2.883 2.883 0 0 1-2.167-1 .362.362 0 0 1 .54-.481 2.118 2.118 0 0 0 3.253 0 .362.362 0 0 1 .54.481 2.883 2.883 0 0 1-2.168.999zm1.76-3.666a.362.362 0 0 1-.362-.362V7.405a.362.362 0 1 1 .723 0v1.026a.362.362 0 0 1-.363.362zm-3.52 0a.362.362 0 0 1-.362-.362V7.405a.362.362 0 0 1 .723 0v1.026a.362.362 0 0 1-.363.362zM10.6 6.194a.362.362 0 0 1-.016-.511 1.77 1.77 0 0 1 2.607 0 .362.362 0 1 1-.527.5 1.047 1.047 0 0 0-1.553 0 .362.362 0 0 1-.511.011zm6.583-.016a1.047 1.047 0 0 0-1.553 0 .362.362 0 0 1-.527-.5 1.77 1.77 0 0 1 2.607 0 .362.362 0 1 1-.527.5z"
					data-name="Path 78"
				/>
			</g>
			<path
				id="Line_13"
				d="M0 0L83.933 0"
				className={classes.cls2}
				data-name="Line 13"
				transform="translate(.213 11.301)"
			/>
			<path
				id="Line_14"
				d="M0 0L25.587 0"
				className={classes.cls4}
				data-name="Line 14"
				transform="translate(30.065 5.757)"
			/>
			<path
				id="Line_15"
				d="M0 0L31.771 0"
				className={classes.cls4}
				data-name="Line 15"
				transform="translate(45.204 21.11)"
			/>
			<path
				id="Line_16"
				d="M0 0L31.771 0"
				className={classes.cls4}
				data-name="Line 16"
				transform="translate(45.204 28.786)"
			/>
			<path
				id="Line_17"
				d="M0 0L31.771 0"
				className={classes.cls4}
				data-name="Line 17"
				transform="translate(45.204 36.462)"
			/>
		</SvgIcon>
	);
};

ProofOfAgeIcon.defaultProps = {
	fill: BACKGROUND_COLOR.primary,
	width: 85.291,
	height: 51.175,
	className: '',
};

/**
 * Pen Icon
 */
const PenIcon = ({ fill, width, height, className }: ICommonProps) => {
	const classes = proofOfAgeStyles({ fill: fill || '' });
	return (
		<SvgIcon
			id="pen_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 19.75 19.748"
			className={className}
		>
			<path
				d="M17.481.766a2.72 2.72 0 0 0-3.843 0l-.962.967-10.24 10.235-.022.022c-.005.01-.005.01-.014.01-.011.016-.027.032-.038.049s-.006.005-.006.011-.016.027-.027.044-.005.011-.011.016-.011.027-.016.044-.005.005-.005.011L.028 19.007a.535.535 0 0 0 .13.554.547.547 0 0 0 .386.158.641.641 0 0 0 .174-.027l6.827-2.277c.005 0 .005 0 .011-.005a.2.2 0 0 0 .049-.022.019.019 0 0 0 .011-.005c.016-.011.038-.022.054-.033s.033-.027.049-.038.011-.006.011-.011.016-.011.022-.022l11.2-11.2a2.72 2.72 0 0 0 0-3.843zM7.371 16.137l-3.783-3.783 9.469-9.469 3.783 3.783zM3.055 13.36l3.3 3.3L1.4 18.317zm15.133-8.045l-.576.582-3.784-3.784.582-.581a1.63 1.63 0 0 1 2.3 0l1.483 1.478a1.636 1.636 0 0 1-.005 2.3zm0 0"
				transform="translate(.001 .029)"
			/>
		</SvgIcon>
	);
};

PenIcon.defaultProps = {
	fill: '#fff',
	width: 19.75,
	height: 19.748,
	className: '',
};

/**
 * Warning Icon
 */
const WarningIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="warning_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 1000 1000"
			className={className}
		>
			<g>
				<path d="M459.7,768.6c0,22.3,18,40.3,40.3,40.3c22.3,0,40.3-18,40.3-40.3c0-22.3-18-40.3-40.3-40.3C477.8,728.3,459.7,746.4,459.7,768.6z" />
				<path d="M500,298.5c-22.2,0-40.3,18.1-40.3,40.3v322.3c0,22.2,18.1,40.3,40.3,40.3c22.2,0,40.3-18.1,40.3-40.3V338.8C540.3,316.6,522.2,298.5,500,298.5z" />
				<path d="M968.8,778L598.5,83.6c-23-34.7-57.7-53.7-98.5-53.7c-40.8,0-75.5,19-98.4,53.7L31.2,778c-25.6,38.7-28.2,85.2-6.9,126.6c21.2,41.4,59.9,65.5,105.4,65.5h740.7c45.4,0,84.1-24,105.4-65.5C997,863.2,994.4,816.7,968.8,778z M936.5,849.1c0,24.9-28.6,58.4-50.3,67.2h11H105.1c-20.4-7.9-35.2-30.2-37.5-53.3c-0.9-4-1.6-8.1-1.6-12.4c0-10,2.9-19.2,7.5-27.3l-9.2,17.2l364.9-687.2c12.6-46.7,40.3-63,70.7-63c30.4,0,52.2,16.3,65.1,63.5l385.1,721L936.5,849.1z" />
			</g>
		</SvgIcon>
	);
};

WarningIcon.defaultProps = {
	fill: '#727272',
	width: 1000,
	height: 1000,
	className: '',
};

/**
 * Upload Icon
 */
const UploadIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="upload_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 32 45"
			className={className}
		>
			<g id="upload" transform="translate(0 -0.358)">
				<g id="Group_1537" data-name="Group 1537" transform="translate(0 25.844)">
					<g id="Group_1536" data-name="Group 1536">
						<path
							id="Path_1328"
							data-name="Path 1328"
							d="M36.875,312.642v10.1a1.512,1.512,0,0,1-1.562,1.453H4.688a1.512,1.512,0,0,1-1.562-1.453v-10.1H0v10.1A4.537,4.537,0,0,0,4.688,327.1H35.313A4.537,4.537,0,0,0,40,322.741v-10.1Z"
							transform="translate(0 -312.642)"
							fill={fill}
						/>
					</g>
				</g>
				<g id="Group_1539" data-name="Group 1539" transform="translate(10.97 0.358)">
					<g id="Group_1538" data-name="Group 1538">
						<path
							id="Path_1329"
							data-name="Path 1329"
							d="M140.746.358l-9.03,9.03,2.055,2.055,5.522-5.522V28.569H142.2V5.921l5.522,5.522,2.055-2.055Z"
							transform="translate(-131.716 -0.358)"
							fill={fill}
						/>
					</g>
				</g>
			</g>
		</SvgIcon>
	);
};

UploadIcon.defaultProps = {
	fill: '#cb5df1',
	width: 32,
	height: 36,
	className: '',
};

/**
 * Manual Verify Icon
 */
const ManuealVerifyIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="manual_verified_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 26.48 26.48"
			className={className}
		>
			<g id="Group_1671" data-name="Group 1671" transform="translate(3.31 15.447)">
				<path
					id="Path_2202"
					data-name="Path 2202"
					d="M10.172,15.1H3.552a.552.552,0,1,1,0-1.1h6.62a.552.552,0,0,1,0,1.1Z"
					transform="translate(-3 -14)"
				/>
			</g>
			<g id="Group_1672" data-name="Group 1672" transform="translate(3.31 18.757)">
				<path
					id="Path_2203"
					data-name="Path 2203"
					d="M9.068,18.1H3.552a.552.552,0,0,1,0-1.1H9.068a.552.552,0,0,1,0,1.1Z"
					transform="translate(-3 -17)"
				/>
			</g>
			<g id="Group_1673" data-name="Group 1673" transform="translate(7.172 3.31)">
				<path
					id="Path_2204"
					data-name="Path 2204"
					d="M8.707,7.413a2.207,2.207,0,1,1,2.207-2.207A2.209,2.209,0,0,1,8.707,7.413Zm0-3.31a1.1,1.1,0,1,0,1.1,1.1A1.105,1.105,0,0,0,8.707,4.1Z"
					transform="translate(-6.5 -3)"
				/>
			</g>
			<g id="Group_1674" data-name="Group 1674" transform="translate(4.965 8.827)">
				<path
					id="Path_2205"
					data-name="Path 2205"
					d="M12.775,12.413a.552.552,0,0,1-.552-.552v-1.1A1.657,1.657,0,0,0,10.568,9.1H7.258A1.657,1.657,0,0,0,5.6,10.758v1.1a.552.552,0,0,1-1.1,0v-1.1A2.762,2.762,0,0,1,7.258,8h3.31a2.762,2.762,0,0,1,2.758,2.758v1.1A.552.552,0,0,1,12.775,12.413Z"
					transform="translate(-4.5 -8)"
				/>
			</g>
			<g id="Group_1675" data-name="Group 1675">
				<path
					id="Path_2206"
					data-name="Path 2206"
					d="M10.482,23.17H2.758A2.762,2.762,0,0,1,0,20.412V2.758A2.762,2.762,0,0,1,2.758,0H16a2.762,2.762,0,0,1,2.758,2.758V9.445a.552.552,0,0,1-1.1,0V2.758A1.657,1.657,0,0,0,16,1.1H2.758A1.657,1.657,0,0,0,1.1,2.758V20.412a1.657,1.657,0,0,0,1.655,1.655h7.723a.552.552,0,0,1,0,1.1Z"
				/>
			</g>
			<g id="Group_1676" data-name="Group 1676" transform="translate(12.137 12.137)">
				<path
					id="Path_2207"
					data-name="Path 2207"
					d="M18.172,25.343a7.172,7.172,0,1,1,7.172-7.172A7.18,7.18,0,0,1,18.172,25.343Zm0-13.24a6.068,6.068,0,1,0,6.068,6.068A6.075,6.075,0,0,0,18.172,12.1Z"
					transform="translate(-11 -11)"
				/>
			</g>
			<g id="Group_1677" data-name="Group 1677" transform="translate(15.446 16.549)">
				<path
					id="Path_2208"
					data-name="Path 2208"
					d="M16.758,20.517a.558.558,0,0,1-.391-.161l-2.207-2.207a.552.552,0,0,1,.78-.78l1.79,1.79,3.473-3.97a.552.552,0,1,1,.831.727l-3.862,4.413a.55.55,0,0,1-.4.188Z"
					transform="translate(-14 -14.999)"
				/>
			</g>
		</SvgIcon>
	);
};

ManuealVerifyIcon.defaultProps = {
	fill: '#727272',
	width: 26.48,
	height: 26.48,
	className: '',
};

/**
 * Job Start Icon
 */
const JobStartIcon = ({ fill, width, height, className }: ICommonProps) => {
	return (
		<SvgIcon
			id="manual_verified_icon"
			width={width}
			height={height}
			fill={fill}
			viewBox="0 0 250 250"
			className={className}
		>
			<defs>
				<filter
					id="Rectangle_1656"
					x="10"
					y="52"
					width="222"
					height="152"
					filterUnits="userSpaceOnUse"
				>
					<feOffset dy="3" in="SourceAlpha" />
					<feGaussianBlur stdDeviation="10" result="blur" />
					<feFlood floodColor="#cb5df1" floodOpacity="0.188" />
					<feComposite operator="in" in2="blur" />
					<feComposite in="SourceGraphic" />
				</filter>
			</defs>
			<g id="Group_1710" data-name="Group 1710" transform="translate(-934 -319)">
				<g id="Group_1708" data-name="Group 1708" transform="translate(576.4 17.4)">
					<circle
						id="Ellipse_6"
						data-name="Ellipse 6"
						cx="125"
						cy="125"
						r="125"
						transform="translate(357.6 301.6)"
						fill="#cb5df1"
						opacity="0.06"
					/>
					<g transform="matrix(1, 0, 0, 1, 357.6, 301.6)" filter="url(#Rectangle_1656)">
						<rect
							id="Rectangle_1656-2"
							data-name="Rectangle 1656"
							width="162"
							height="92"
							transform="translate(40 79)"
							fill="#fff"
						/>
					</g>
					<rect
						id="Rectangle_1657"
						data-name="Rectangle 1657"
						width="68"
						height="4"
						transform="translate(414.6 397.6)"
						fill="#b6b6b6"
						opacity="0.75"
					/>
					<rect
						id="Rectangle_1658"
						data-name="Rectangle 1658"
						width="94"
						height="4"
						transform="translate(414.6 407.6)"
						fill="#b6b6b6"
						opacity="0.37"
					/>
					<rect
						id="Rectangle_1659"
						data-name="Rectangle 1659"
						width="94"
						height="5"
						transform="translate(414.6 416.6)"
						fill="#b6b6b6"
						opacity="0.37"
					/>
					<rect
						id="Rectangle_1660"
						data-name="Rectangle 1660"
						width="47"
						height="5"
						transform="translate(414.6 426.6)"
						fill="#b6b6b6"
						opacity="0.37"
					/>
					<rect
						id="Rectangle_1661"
						data-name="Rectangle 1661"
						width="66"
						height="16"
						rx="6"
						transform="translate(470.6 443.6)"
						fill="#b6b6b6"
						opacity="0.37"
					/>
				</g>
				<g id="tap_1_" data-name="tap (1)" transform="translate(1064.77 466.883)">
					<path
						id="Path_2253"
						data-name="Path 2253"
						d="M35.574,52.206H35.5a4.062,4.062,0,0,0-2.738,1.041A4.27,4.27,0,0,0,28.8,50.354a4.113,4.113,0,0,0-2.938,1.264,4.209,4.209,0,0,0-3.756-2.4h-.079a3.856,3.856,0,0,0-2.418.806v-10.2a4.379,4.379,0,0,0-4.255-4.471,4.371,4.371,0,0,0-4.243,4.468L11.09,60.058,9.944,58.667a5.778,5.778,0,0,0-4.083-2.145A5.685,5.685,0,0,0,1.6,58.03l-1,.826a.886.886,0,0,0-.221,1.091l9.691,18.629a9.992,9.992,0,0,0,8.8,5.528H29.8v-.01c5.538,0,10.028-4.805,10.033-10.706,0-2.64-.008-4.608-.006-6.2.006-4.267,0-5.841-.01-10.542a4.35,4.35,0,0,0-4.24-4.439ZM38.038,67.18c0,1.6,0,3.571-.007,6.21,0,4.925-3.722,8.94-8.287,8.94H18.875a8.227,8.227,0,0,1-7.227-4.574L2.287,59.768l.462-.385.034-.031a3.933,3.933,0,0,1,2.953-1.061,4.021,4.021,0,0,1,2.836,1.5l2.712,3.3a.886.886,0,0,0,1.57-.562l.016-22.715a2.608,2.608,0,0,1,2.482-2.7,2.608,2.608,0,0,1,2.482,2.7v13.7c0,.048,0,.1,0,.144,0,.021,0,.042,0,.062v5.856a.886.886,0,1,0,1.772,0V53.544a2.484,2.484,0,0,1,2.418-2.556H22.1a2.587,2.587,0,0,1,2.487,2.672v5.358a.886.886,0,0,0,1.772,0v-4.2a2.449,2.449,0,1,1,4.873,0v3.966a.886.886,0,1,0,1.772,0V56.632A2.574,2.574,0,0,1,35.5,53.978h.074a2.571,2.571,0,0,1,2.461,2.669c.011,4.7.009,6.27,0,10.533Zm0,0"
						transform="translate(0 -31.432)"
						fill="#b6b6b6"
					/>
					<path
						id="Path_2254"
						data-name="Path 2254"
						d="M65.5,8.769a.886.886,0,0,0,.886-.886,6.14,6.14,0,0,1,12.28,0,.886.886,0,1,0,1.772,0,7.912,7.912,0,0,0-15.824,0A.886.886,0,0,0,65.5,8.769Zm0,0"
						transform="translate(-57.201)"
						fill="#b6b6b6"
					/>
				</g>
			</g>
		</SvgIcon>
	);
};

JobStartIcon.defaultProps = {
	fill: '#727272',
	width: 250,
	height: 250,
	className: '',
};

/**
 * Export Icons
 */
export {
	MenuIcon,
	SubscriptionIcon,
	ComputerIcon,
	GroupIcon,
	ListIcon,
	VerifiedIcon,
	UserIcon,
	LogOutIcon,
	ContactIcon,
	PassportIcon,
	MedicareIcon,
	ProofOfAgeIcon,
	PenIcon,
	WarningIcon,
	UploadIcon,
	ManuealVerifyIcon,
	JobStartIcon,
};
