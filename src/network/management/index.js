import request from '@/network/request'
import {DATA_LIST} from '@/apis'

export const listAllData = (config) => request._post(DATA_LIST, null, config)
