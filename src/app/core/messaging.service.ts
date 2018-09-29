import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class MessagingService {

  subCollectionRef: AngularFirestoreCollection<any>;


  constructor(
    private swPush: SwPush,
    private afs: AngularFirestore
  ) {
    this.subCollectionRef = this.afs.collection<any>('subscriptions');
  }

  async init() {
    const key = 'BB03ct4gjDfkS1s0jCDlvypQyw97Aa72qooDRaC6GNEDC77IlB51yWqQgKbmsOI9JAnUz72161XVO38ByZ_BiKE';
    console.log('init');

    const sub = await this.swPush.requestSubscription({serverPublicKey: key});

    this.afs.collection<any>('subscriptions', ref => ref.where('endpoint', '==', sub.endpoint)).valueChanges()
    .subscribe(data => {
      if (data.length === 0) {
        const subscribe = this.addSub(sub.toJSON());
        console.log('subscription added!', subscribe);
      }
    });
  }

  addSub(sub: any) {
    if (sub) {
      return this.subCollectionRef.add(sub);
    }
  }

}
