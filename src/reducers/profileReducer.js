import { actions } from "../actions"

const initialState = {
    loading: false,
    profile: {},
    error: null
}

const profileReducer = (state, action) => {
    switch(action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            }
        }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                profile: action.data
            }
        }

        case actions.profile.DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        case actions.profile.BLOG_DELETED: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    blogs: state.profile.blogs.filter(blog => blog.id !== action.payload)
                }
            }
        }

    }
}

export { initialState, profileReducer }
