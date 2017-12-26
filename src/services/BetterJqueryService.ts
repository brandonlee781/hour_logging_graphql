// tslint:disable:no-any
import { DontBeAActions } from '../actions';
import { DontBeAModel } from '../models/DontBeAModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';
require('dotenv').config();

import axios from 'axios';
// import * as parser from 'xml2json';
import * as fs from 'fs';

const gitApi = axios.create({
  baseURL: 'https://api.github.com/repos/jquery/api.jquery.com/contents/entries/',
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
});

export class BetterJqueryService {

  private log = Logger('app:service:BetterJqueryService');

  // public async findAll(options: common.PageinationArguments): Promise<DontBeAModel[]> {
  //   this.log.debug('findAll called');
  //   const results = await this.dontBeAAction.findAll(options);
  //   return results.map(result => new DontBeAModel(result));
  // }

  // public async createAll() {
  //   try {
  //     const response = await gitApi.get('/');
  //     const fileNames = response.data.map(file => file.name);
  //     const files = fileNames.map((file) => {
  //       return gitApi.get(`/${file}`);
  //     });
  //     axios.all(files)
  //       .then(axios.spread((...args) => {
  //         args.forEach((file: any) => {
  //           const buf = Buffer.from(file.data.content, 'base64');
  //           const str = parser.toJson(buf.toString());
  //           const json = JSON.parse(str);
  //           fs.appendFile('jquery.json', str, (err) => {
  //             if (err) {
  //               console.error(err);
  //             }
  //             console.log('wrote ' + json.name);
  //           });
  //         });

  //       }))
  //       .catch(err => console.error(err));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}