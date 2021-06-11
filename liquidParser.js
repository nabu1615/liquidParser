import { Liquid } from 'liquidjs'

export default class LiquidParserClass {
    /**
     * Create a Client.
     * @param library object containing all local liquid context
     * @param env string containing env name
     * @returns function with all Liquid instance
     */
    constructor(library, env) {
        this.library = library;
        this.isNotProduction = env && env !== 'production';

        this.engine = this.isNotProduction ? new Liquid({
            strictFilters: true,
            strictVariables: true,
        }) : null;
    }

    /**
     * Parse a liquid string
     * @param liquidString Target Content Space UID
     * @returns a usable object or string
     */
    async parseLiquidAsync(liquidString) {
        try {
            const parsed = await this.engine.parseAndRender(liquidString, this.library);
            return parsed;
        } catch (error) {
            return error;
        }
    }

    /**
     * Parse a liquid string
     * @param liquidString Target Content Space UID
     * @returns a usable object or string
     */
    parseLiquid(liquidString) {
        try {
            const parsed = this.engine.parseAndRenderSync(liquidString, this.library);
            return parsed;
        } catch (error) {
            return error;
        }
    }

    parse(liquidString) {
        if (this.isNotProduction) {
            return this.parseLiquid(liquidString);
        }
        return liquidString;
    }

    parseAsync(liquidString) {
        if (this.isNotProduction) {
            return this.parseLiquidAsync(liquidString);
        }
        return liquidString;
    }
}