import React from 'react';
import loadingStyles from '../../common/styles/loading.less';

export default () => (
    <div className={loadingStyles.loadingContainer}>
      <div className="loadingStar">
        <img src={require('../../common/images/kv-slide-loading-star-icon.png')} alt="" className={loadingStyles.loading}/>
      </div>
      <div>
        <img src={require('../../common/images/kv-slide-loading-text.png')} alt=""  className={loadingStyles.loadingText} />
      </div>
    </div>
)