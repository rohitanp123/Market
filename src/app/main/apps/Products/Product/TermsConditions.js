import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './tcstyle.css';

class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>        
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          scroll={this.state.scroll}
          fullWidth = { true }
          maxWidth = { 'md' }
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Terms And Conditions</DialogTitle>
          <DialogContent>
            <DialogContentText>
            <div>
                    <div className="block_">Oman Arab Bank (OAB) – Market Connect </div>
                    <div className="block_1" style={{ textAlign:'center' }} >Terms of Use<span className="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                    <div className="block_2">Welcome to Oman Arab Bank’s online Market Connect for businesses (the “<b className="calibre1">Market Connect</b>”). The Market Connect is a business-to-business e-commerce portal owned and operated by Oman Arab Bank SAOC (“<b className="calibre1">OAB</b>”, the “<b className="calibre1">bank</b>”, “<b className="calibre1">we</b>”, “<b className="calibre1">us</b>”). By accessing&nbsp;Market Connect, you agree to these terms of use, which are effective&nbsp;as of <b className="calibre1">October 23, 2019.</b></div>
                    <div className="block_2">The Market Connect is a platform to benefit the bank’s clients, particularly SMEs, by facilitating interaction with other clients of the bank who may have a need or desire for a particular product or service. </div>
                    <div className="block_2">By agreeing to these terms of use (i.e., by accessing and/or transacting in the Market Connect), you will (i) have the opportunity to browse products and services on offer by other Market Connect participants, (ii) have the ability to offer products and services to other Market Connect participants, and (iii) be facilitated in closing Market Connect transactions via the bank’s Market Connect payment gateway. </div>
                    
                    <ol className="list_">
                      <li className="block_3"><b className="calibre1">Some Key Information about Market Connect</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">.1.&nbsp;You understand that the bank does not buy or sell any products or services. The bank may however display from time to time promotional content for its own banking-related products and services.</div>
                      <div className="block_4">.2.&nbsp;You accept the Market Connect "as-is" and choose to use it at your own risk. Despite the prohibitions set out below, you understand and agree that the Market Connect is a e-commerce platform which allows for information, materials, offers, advertisement, and promotional materials (“<b className="calibre1">Content</b>”) to be posted by third parties (like you), who do not represent or have any affiliation with the bank (other than being customers of the bank). You therefore understand that Market Connect Content may contain inaccurate material, and the bank assumes no responsibility or liability for any such material.</div>
                      <div className="block_4">.3.&nbsp;You represent, warrant, and covenant that any product or service offered by virtue of Content posted by you shall be immediately available for shipment/delivery at the time the transaction is settled via the Market Connect payment gateway. Further, any such product or service shall be actually delivered/provided<span className="calibre3"> within the time period stipulated in your offer.</span></div>
                      <div className="block_4">.4.&nbsp;Any Content posted by you offering to provide a product/service must be extended on preferential terms of at least a 5% discount off the standard non-Market Connect rates/price for such product/service, and your Content must affirmatively stipulate that to be the case. </div>
                    </div>
                    <div className="block_5">&nbsp;</div>
                    <ol className="list_">
                      <li value={2} className="block_3"><b className="calibre1">Boosting</b></li>
                    </ol>
                    <div className="block_6"><span className="text_">You will have the opportunity to “boost” your Content, so that it appears more frequently within Market Connect. A separate “marketing” fee shall apply for such “boosting,” which </span><span className="text_1">will be charged and debited from your account with the bank upon confirmation of your “boosting request” submitted via the Market Connect. Market Connect<span className="calibre3"> boosting fees are subject to change from time to time without notice.  The bank makes no representation, warranty, guarantee or assurance that “boosting” will increase your revenue or sales</span></span><span className="text_1"> with respect to any such “boosted” Content. </span></div>
                    <ol className="list_">
                      <li value={3} className="block_3"><b className="calibre1">Market Connect Code of Conduct</b></li>
                    </ol>
                    <div className="block_7">In addition to the other terms of use set forth herein, by accessing and/or transacting in the Market Connect, you expressly agree to abide by the following Market Connect Code of Conduct:</div>
                    <div className="calibre4">
                      <div className="block_4"><span className="bullet_">(i)&nbsp;</span><span className="calibre5">All Content you post to the Market Connect shall be relevant to your line of business, and you represent, warrant, and covenant to the bank (and for the benefit of all other Market Connect participants), that the Content shall be accurate, timely and transparent, and shall comply with all applicable ethical, moral and legal standards. </span></div>
                      <div className="block_4"><span className="bullet_">(ii)&nbsp;</span><span className="calibre5">You acknowledge and agree that the bank has the right to reject your posted Content if, in the bank’s absolute discretion, such Content violates or does not comport with any of these terms of use. </span></div>
                      <div className="block_4"><span className="bullet_">(iii)&nbsp;</span><span className="calibre5">You agree to update and maintain your posted Content as and when required to ensure that it is relevant, timely, and does not become stale with respect to products/services on offer.</span></div>
                      <div className="block_4"><span className="bullet_">(iv)&nbsp;</span><span className="calibre5">You agree that you will deal with all other Market Connect participants in a fair, transparent, and ethical manner, which includes having an express refund/return policy stipulated in your Content and abiding by such policy in all instances.</span></div>
                      <div className="block_4"><span className="bullet_">(v)&nbsp;</span><span className="calibre5">You agree to respond to any actual/potential queries and/or complaints from the bank and/or other Market Connect participants within 48hrs of receiving the same. </span></div>
                      <div className="block_4"><span className="bullet_">(vi)&nbsp;</span><span className="calibre5">You agree that you shall not post any Content to Market Connect that is not applicable to other parties having a right to access and transact within the Market Connect (i.e., for the sake of clarity, you understand that the Market Connect is a value-added service provided to OAB customers only and therefore Content, offers, discounts, etc. may not be shared with or otherwise extended to any third party who is not a qualified Market Connect participant).</span></div>
                      <div className="block_4"><span className="bullet_">(vii)&nbsp;</span><span className="calibre5">You agree to maintain in strictest confidence all login passwords or other data/instruments allowing for access to the Market Connect. You shall with respect to the Market Connect adhere to policies of cybersecurity that are reasonable. </span></div>
                    </div>
                    <ol className="list_">
                      <li value={4} className="block_3"><b className="calibre1">Intellectual Property Rights &amp; Posted Content</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">4.1.&nbsp;We respect the “intellectual property rights” of others, and we expect all Market Connect participants to do the same. You therefore agree that any Content that you post to the Market Connect shall be in accordance with your rights to do so subject to your ownership of any intellectual property attaching to such Content, or otherwise subject to a valid license to post such Content conveyed to you by the owner thereof. By “intellectual property rights”, we mean all “intellectual property rights” in the broadest sense, howsoever arising, including with respect to copyright, trademark, logos, designs, images, text, video, web-designs, know-how, patent, moral rights, etc.</div>
                      <div className="block_4">4.2.&nbsp;You also represent, warrant, and covenant that any Content that you post shall not make an offer to deal in counterfeits, non-licensed replicas, or unauthorized products. If your Content includes the offer of branded items, then we may request from time to time and at any time that you provide us a certificate of authorization issued by the brand owner.<span className="calibre3">  However, such a request does not relieve you of any liability for such Content, and we assume no liability to you or any third party for </span>making in any such request.</div>
                    </div>
                    <ol className="list_">
                      <li value={5} className="block_3"><b className="calibre1">Your Liability</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">5.1.&nbsp;You agree to indemnify and hold us (and our officers, directors, agents, subsidiaries, joint ventures, employees and partners) harmless from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with your use of the Market Connect, whether as a buyer/seller of products/services.</div>
                      <div className="block_4">5.2.&nbsp;You will indemnify and hold us (and our officers, directors, agents, subsidiaries, joint ventures, and employees) harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of these terms of use, or your violation of any law or the rights of a third party.</div>
                      <div className="block_4">5.3.&nbsp;Nothing in these terms of use shall limit or exclude your liability for fraudulent misrepresentation, for death or personal injury resulting from your negligence or the negligence of your agents or employees or for any other liability that cannot be limited or excluded by law.</div>
                    </div>
                    <ol className="list_">
                      <li value={6} className="block_3"><b className="calibre1">The Bank’s Liability</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">6.1.&nbsp;The bank will not be liable for any business transactions or dealings that take place between Market Connect participants. You acknowledge and agree that the bank is merely acting as a facilitator by providing the Market Connect platform and payment gateway. In addition, the bank will not be held liable for any Content posted in the Market Connect, damages, defective items or other product, service or delivery problems. </div>
                      <div className="block_4">6.2.&nbsp;We may or may not control, censor or supervise information, comments or communications by and between Market Connect participants. </div>
                      <div className="block_4">6.3.&nbsp;You may find other participants’ comments offensive, harmful, inaccurate or deceptive; therefore, you will not hold Market Connect responsible for other participants’ actions or inactions, including any communication between you and other participants. </div>
                    </div>
                    <ol className="list_">
                      <li value={7} className="block_3"><b className="calibre1">Transaction Fulfillment</b></li>
                    </ol>
                    <div className="block_7">The bank is not responsible for the fulfilment or delivery of products/services purchased via the Market Connect.</div>
                    <ol className="list_">
                      <li value={8} className="block_3"><b className="calibre1">Payment Settlement</b></li>
                    </ol>
                    <div className="block_7">The Market Connect only allows for payments to be settled via corporate credit cards or intra-bank transfers via the Market Connect payment gateway located on the checkout page. The bank reserves its right to allow other forms of payment settlement from time to time in the future.</div>
                    <ol className="list_">
                      <li value={9} className="block_3"><b className="calibre1">Personal Information</b></li>
                    </ol>
                    <div className="block_7">By accessing and/or transacting in the Market Connect, you agree to the bank’s collection, transfer, storage and use of certain personal information (which may include any number of analytical fields including size of transaction, nature of products/services, demographic date, etc.) by the Market Connect on servers located in the Sultanate of Oman, o<span className="calibre3">r elsewhere, as the case may be.  All such collection, transfer, storage, and use </span>or analysis of any such personal information shall be in accordance with applicable Oman law, or the laws of any other jurisdiction that is implicated thereby, all of which shall be in accordance with the bank’s privacy policy from time to time in effect, as further described in our&nbsp;<span className="text_2"><a href="http://www.oman-arabbank.com/home/disclaimer/" target="__blanck">Privacy Policy</a></span><span className="text_3">.</span></div>
                    <ol className="list_">
                      <li value={10} className="block_3"><b className="calibre1">Prohibited Products and Services</b></li>
                    </ol>
                    <div className="calibre4">
                      <div className="block_4"><span className="bullet_">(i)&nbsp;</span><span className="calibre5">You understand and agree that there are certain types of products and services that are not permitted to be advertised, promoted, or otherwise bought or sold in the Market Connect. These items include (but are not limited to), gambling products, tobacco, prescription or illicit drugs, counterfeit merchandise or knock-offs, or any other product or service thing that is otherwise prohibited under Oman law (or the law of the jurisdiction in which you reside if other than Oman). </span></div>
                      <div className="block_4"><span className="bullet_">(ii)&nbsp;</span><span className="calibre5">Further you agree that at all times your use of the Market Connect shall comply with the Oman Consumer Protection Law (Royal Decree No. 66/2014), and the Electronics Transactions Law (Royal Decree No. 69/2008).</span></div>
                    </div>
                    <ol className="list_">
                      <li value={11} className="block_3"><b className="calibre1">Bad Behavior </b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">11.1.&nbsp;If the bank determines, in its absolute discretion, that your conduct or Content posted in the Market Connect is abusive or otherwise violates the letter or spirit of these terms of use, then we may limit or terminate your access to the Market Connect, remove your Content and take technical and legal steps to preserve the bank’s rights/interests. </div>
                      <div className="block_4">11.2.&nbsp;If in accessing or transacting on the Market Connect you encounter Content and/or participant behavior that you believe is inconsistent with these terms of use, then you agree to promptly report such problems, offensive Content and policy violations by emailing us at&nbsp;<span className="text_4">info@oman-arabbank.com.</span> </div>
                      <div className="block_4">11.3.&nbsp;However, please note that the bank is not and will not be the arbiter of disputes between participants transacting in the Market Connect. To the extent you encounter a problem with the products/services purchased in the Market Connect, then your recourse is solely against the counterparty to such transaction (in accordance with any agreed refund/return policy), and not with the bank.</div>
                    </div>
                    <ol className="list_">
                      <li value={12} className="block_3"><b className="calibre1">General</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">12.1.&nbsp;These terms of use and the other policies posted on Market Connect (including the Privacy Policy) constitute the entire agreement between the bank and you in connection with Market Connect, superseding any conflicting parts of any prior agreements.</div>
                      <div className="block_4">12.2.&nbsp;Please be aware that if we do not enforce any particular provision of these terms of use that does not mean that we are waiving our right to do so later. If a competent court determines that any of these terms of use are invalid or otherwise unenforceable, then the remaining terms shall nevertheless survive and remain in full force and effect. </div>
                      <div className="block_4">12.3.&nbsp;You agree that we may automatically assign this agreement in our sole discretion to any third party who acquires the bank or an interest in the Market Connect. We will provide you subsequent notice following such assignment. </div>
                      <div className="block_4">12.4.&nbsp;<span className="calibre3">These terms of use may be amended from time to time.  At such time that these terms of use are amended, we will provide notice of that fact at the time you login to access the </span>Market Connect. Your continuing accessing and transacting in the Market Connect shall constitute your express consent and acceptance of any such modifications/amendments.</div>
                      <div className="block_4">12.5.&nbsp;No agency, partnership, joint venture, employee-employer or franchiser-franchisee relationship is intended or created by these terms of use. </div>
                      <div className="block_4">12.6.&nbsp;Any translation of these terms of use and all related documents is done for local requirements and in the event of a dispute between the versions, the English version of these terms of use and all related documents shall control.</div>
                    </div>
                    <div className="block_5">&nbsp;</div>
                    <ol className="list_">
                      <li value={13} className="block_3"><b className="calibre1">Disputes</b></li>
                    </ol>
                    <div className="block_7">Any claim or dispute at law or equity that has arisen, or may arise, between you and the bank relating to the Market Connect shall be settled via the competent Omani courts, who shall have exclusive jurisdiction over all such matters.</div>
                    <ol className="list_">
                      <li value={14} className="block_3"><b className="calibre1">Downtime</b></li>
                    </ol>
                    <div className="calibre2">
                      <div className="block_4">14.1.&nbsp;While we try to offer a reliable platform, we cannot promise that the Market Connect or your Content will always be accessible. We accept no liability for such non-accessibility. Further, we will endeavor to ensure that any Content posted by you is uploaded to the Market Connect (and visible to other participants) within 48 hours of your posting. However, this is merely guidance and not a guarantee. We accept no liability for any delay in uploading such Content or otherwise ensuring that it is visible in the Market Connect.</div>
                      <div className="block_4">14.2.&nbsp;We shall not be liable for any claim arising out of the performance, non-performance, delay in delivery of or defect in your Content, nor for any special, indirect, economic or consequential loss or damage howsoever arising or howsoever caused (including loss of profit or loss of revenue).</div>
                    </div>
                    <div className="block_8">***</div>
                  </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} variant="contained" color="primary" autoFocus>
              Cancel
            </Button>            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ScrollDialog;
