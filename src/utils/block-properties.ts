import { isEqual } from 'lodash'
export { BlockProperties as default, Properties }

type Properties = {
	[propName: string]: any
}

class BlockProperties {
	constructor(protected props: Properties) { }

	getProperty(propName: string): any | null {
		return propName in this.props ? this.props[propName] : null
	}

	getAllPropertyNames(): string[] {
		return Object.keys(this.props)
	}

	setProperty(propName: string, propValue: any): void {
		this.props[propName] = propValue
	}

	equalTo(propsToCompare: Properties): boolean {
		return isEqual(this.props, propsToCompare)
	}
}