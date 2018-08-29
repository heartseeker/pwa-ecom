import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';



@Injectable()
export class MessagingService {

  subCollectionRef: AngularFirestoreCollection<any>;
  sub$: Observable<any[]>;
  messaging = firebase.messaging();

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private afs: AngularFirestore
  ) {
    this.subCollectionRef = this.afs.collection<any>('subscriptions');
    this.sub$ = this.subCollectionRef.valueChanges();
  }

  async init() {
    const key = 'BB03ct4gjDfkS1s0jCDlvypQyw97Aa72qooDRaC6GNEDC77IlB51yWqQgKbmsOI9JAnUz72161XVO38ByZ_BiKE';
    console.log('init');

    const sub = await this.swPush.requestSubscription({serverPublicKey: key});
    console.log('key', sub.toJSON());


    const docSnapshot = this.afs.collection<any>('subscriptions', ref => ref.where('endpoint', '==', sub.endpoint)).valueChanges().take(1)
      .subscribe(data => {
        if (data.length === 0) {
          const subscribe = this.addSub(sub.toJSON());
          console.log('subscription added!', subscribe);
        }
        console.log('res data', data);
      });
  }

  addSub(sub: any) {
    if (sub) {
      return this.subCollectionRef.add(sub);
    }
  }

  async subscribe() {
    const sub = await this.addSub('test only');
    console.log('sub', sub);
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
     console.log('Message received. ', payload);
    //  this.currentMessage.next(payload);
   });
 }

}
