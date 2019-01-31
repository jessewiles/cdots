import React from 'react'
import { shallow } from 'enzyme'
import '../util/setup.js'

import Timeline, { TimelineList } from './Timeline.js'

let timelines = [{
    id: 'abc',
    name: 'omega',
    dots: [{
        id: "alpha",
        content: "alpha content",
        start: "2015-01-12T00:00:00Z"
    }, {
        id: "beta",
        content: "beta content",
        start: "2017-01-12T00:00:00Z"
    }, {
        id: "gamma",
        content: "gamma content",
        start: "2019-01-12T00:00:00Z"
    }]
}, {
    id: 'def',
    name: 'alpha',
    dots: [{
        id: "alpha",
        content: "alpha content",
        start: "2015-01-12T00:00:00Z"
    }, {
        id: "beta",
        content: "beta content",
        start: "2017-01-12T00:00:00Z"
    }, {
        id: "gamma",
        content: "gamma content",
        start: "2019-01-12T00:00:00Z"
    }]
}]


describe('<TimlineList />', () => {
    test('Sorts list by name', () => {
        let wrapper
        let mockFetch = (data) => {
            return jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        then: async (f, r) => {
                            f(data)
                            await Promise.resolve({})
                            wrapper.update()
                            expect(wrapper.instance().state.timelines.length).toBe(2)
                            expect(wrapper.instance().state.timelines[0].name).toEqual('alpha')
                        }
                    })
                })
            )
        }
        global.fetch = mockFetch(timelines) // eslint-disable-line no-undef
        wrapper = shallow(<TimelineList />)
        expect(global.fetch).toHaveBeenCalledTimes(1) // eslint-disable-line no-undef
    })
})

describe('<Timeline />', () => {
    test('Timeline displays a title', () => {
        let wrapper
        let mockFetch = (data) => {
            return jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        then: async (f, r) => {
                            f(data)
                            await Promise.resolve({})
                        }
                    })
                })
            )
        }
        global.fetch = mockFetch(timelines[0]) // eslint-disable-line no-undef
        wrapper = shallow(<Timeline name="omega" />)
        expect(wrapper.find('div').first().html()).toContain('<h2> omega </h2>')
        expect(global.fetch).toHaveBeenCalledTimes(1) // eslint-disable-line no-undef
    })
})
