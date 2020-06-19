import { createService } from '@/global/utils/service';
import api from './api';
import apiConfig from './api.config';
import merge from 'lodash/merge';

const service = createService(merge(api, apiConfig));

export default service;
